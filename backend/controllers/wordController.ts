import { Request, Response } from "express";
import { WordModel } from "../database/models/wordModel";
import { DeckModel } from "../database/models/deckModel";
import { IWordDeck } from "../interfaces";
import { openAIService } from "../services/openai/openaiService";
import { logNewWordToFile } from "../utils/wordCreationLog";

const createWord = async (req: Request, res: Response) => {
  // Get the word and deckID from the request body
  const { word, deckID } = req.body;
  // Get the user from the request object (Middleware)
  const user = req.user;

  try {
    // Get the deck from MongoDB
    const deck = await DeckModel.findById(deckID);

    // Build a new word using the OpenAI API
    if (deck) {
      // Build a new word using the OpenAI API
      const newWord = await openAIService.buildWord(word, user);

      // Asynchronously log the new word to a file, don't wait for it to finish
      logNewWordToFile(newWord).catch((error) => console.error("Failed to log new word:", error));

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
      return res.status(201).json({ message: "Word created successfully!", responseDeck });
    }
    // If the deck does not exist or bad deckID
    return res.status(404).json({ error: `${deckID} bad deckID or deck does not exist.` });
  } catch (error) {
    console.error("Backend: Error creating word:", error);
    res.status(500).json({ error: "Failed to create word" });
  }
};

const deleteWordByID = async (req: Request, res: Response) => {
  // Get the wordID from the request body
  const { id } = req.params;
  console.log("Backend: Deleting word with ID:", req.params);

  try {
    // Find the word by ID and delete it
    const deletedWord = await WordModel.findByIdAndDelete(id);
    console.log(deletedWord);

    // Ensure word was found
    if (!deletedWord) {
      return res.status(404).json({ error: "Word not found" });
    }
    // Ensure deck was found
    const responseDeck = await DeckModel.findById(deletedWord);
    if (!responseDeck) {
      return res.status(404).json({ error: "Deck not found" });
    }
    // Delete the word from the deck
    responseDeck.words = responseDeck.words.filter((word) => word._id.toString() !== id);
    await responseDeck.save();
    // return the updated deck
    return res.status(200).json({ message: "Word deleted successfully!", responseDeck });
  } catch (error) {
    console.log("Backend: Error deleting word:", error);
    res.status(500).json({ error: "Failed to delete word" });
  }
};

export { createWord, deleteWordByID };
