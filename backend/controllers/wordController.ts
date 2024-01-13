import { Request, Response } from "express";
import { WordModel } from "../database/models/wordModel";
import { DeckModel } from "../database/models/deckModel";

import { openAIService } from "../services/openai/openaiService";

const createWord = async (req: Request, res: Response) => {
  // Get the word and deckID from the request body
  const { word, deckID } = req.body;
  // Get the user from the request object (Middleware)
  const user = req.user;

  try {
    const deck = await DeckModel.findById(deckID);
    if (deck) {
      // Build a new word using the OpenAI API
      const newWord = await openAIService.buildWord(word, user);
      const createdWord = new WordModel(newWord);
      await createdWord.save();
      deck.words.push(createdWord);
      await deck.save();
      return res.status(201).json({ message: "Word created and added to the deck successfully", deck });
    }
    // If the deck does not exist or bad deckID
    return res.status(404).json({ error: `${deckID} bad deckID or deck does not exist.` });
  } catch (error) {
    console.error("Backend: Error creating word:", error);
    res.status(500).json({ error: "Failed to create word" });
  }
};

export { createWord };
