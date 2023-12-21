import { Request, Response } from "express";
import { WordModel } from "../database/models/wordModel";
import { DeckModel } from "../database/models/deckModel";

import { openAIService } from "../services/openai/openaiService";

const createWord = async (req: Request, res: Response) => {
  // Get the word and deckID from the request body
  // Get the userID from the request user assigned by middleware
  const { word, deckID } = req.body;
  // const userID = req.user;

  try {
    const deck = await DeckModel.findById(deckID);
    if (deck) {
      // Build a new word using the OpenAI API
      const newWord = await openAIService.buildWord(word);
      console.log(newWord);
      const createdWord = new WordModel(newWord);
      deck.words.push(createdWord);
      await createdWord.save();
      await deck.save();
      return res.status(201).json({ message: "Word created and added to the deck successfully", deck });
    }
    // If the deck does not exist, return an error
    return res.status(404).json({ error: `${deck} does not exist` });
  } catch (error) {
    console.error("Backend: Error creating word:", error);
    res.status(500).json({ error: "Failed to create word" });
  }
};

export { createWord };
