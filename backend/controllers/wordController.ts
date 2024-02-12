import { Request, Response } from "express";
import { WordModel } from "../database/models/wordModel";
import { DeckModel } from "../database/models/deckModel";
import { IWordDeck, IWord } from "../interfaces";
import fs from "fs";
const path = require("path");

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

      // Let's save the new word to a file and ensure it does not overwrite the existing file
      try {
        // Construct the path to the target directory
        const targetDir = path.join(__dirname, "..", "..", "services", "openai");
        // Ensure the target directory exists
        if (!fs.existsSync(targetDir)) {
          fs.mkdirSync(targetDir, { recursive: true });
        }
        // Construct the full path to the file
        const filePath = path.join(targetDir, "createdWords.json");
        // Append the data to the file, creating the file if it doesn't exist
        fs.appendFileSync(filePath, JSON.stringify(newWord, null, 2) + "\n", { encoding: "utf8" });
      } catch (error) {
        // Handle any errors that occur during the file append operation
        console.error("Error appending to file:", error);
        // Additional error handling logic here, such as sending an alert or retrying the operation
      }

      // Create the word in MongoDB
      const createdWord = new WordModel(newWord);
      // Save the word to the database
      await createdWord.save();
      // Add the word to the deck
      deck.words.push(createdWord);
      // Save the deck to the database
      await deck.save();
      // Transform the deck document to match the WordDeck interface
      const responseDeck: IWordDeck = {
        _id: deck._id,
        userID: deck.userID,
        name: deck.name,
        description: deck.description,
        tags: deck.tags,
        creationDate: deck.creationDate,
        favorited: deck.favorited,
        words: JSON.parse(JSON.stringify(deck.words)), //! This is 30x slower than .map, fix later
      };

      // Return the deck with the new word added
      return res.status(201).json({ message: "Word created and added to the deck successfully", responseDeck });
    }
    // If the deck does not exist or bad deckID
    return res.status(404).json({ error: `${deckID} bad deckID or deck does not exist.` });
  } catch (error) {
    console.error("Backend: Error creating word:", error);
    res.status(500).json({ error: "Failed to create word" });
  }
};

export { createWord };
