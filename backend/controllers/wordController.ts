import { Request, Response } from "express";
import { WordModel } from "../mongodb/models/wordModel";
import { DeckModel } from "../mongodb/models/deckModel";

import { openAIService } from "../services/openai/config";

const createWord = async (req: Request, res: Response) => {
  // Get the word and deckID from the request body
  // Get the userID from the request user assigned by middleware
  const { word, definition, deckID } = req.body;
  // const userID = req.user;

  try {
    // Get the deck from the DB
    console.log("Backend: Getting deck ", deckID);
    const deck = await DeckModel.findById(deckID);

    if (!deck) {
      return res.status(404).json({ error: "Error getting deck" });
    } else {
      // Create a new word

      const newWord = new WordModel(openAIService.fakeWordBuilder(word, definition)); // TODO: Change to openAIService.buildWord(word)
      await newWord.save();
      deck.words.push(newWord);
      await deck.save();
      res.status(201).json({ message: "Word created and added to the deck successfully", deck });
      console.log("Backend: Word created and added to the deck successfully");
    }
  } catch (error) {
    console.error("Backend: Error creating word:", error);
    res.status(500).json({ error: "Failed to create word" });
  }
};

export { createWord };
