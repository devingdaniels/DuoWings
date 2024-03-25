import { DeckModel } from "../database/models/deckModel";
import logging from "../config/logging";
import { writeWordToFile } from "../utils/wordCreationLog";
import mongoose from "mongoose";
import { NextFunction, Request, Response } from "express";
import { openAIService } from "../services/openai/openaiService";
import { WordModel } from "../database/models/wordModel";

const NAMESPACE = "wordController.ts";

/*
 * ********************************************************************************************************************
 * Purpose: This function is used to create a new word and add it to its associated deck
 * Input: word, deckID
 * Output: 201 status code and the updated deck with the new word
 * ********************************************************************************************************************
 */
const createWord = async (req: Request, res: Response, next: NextFunction) => {
  const { word, deckID } = req.body;
  const user = req.user; // User is added to the request object by the auth middleware if the token is valid (backend/middleware/auth.ts)

  try {
    // Use the openAI API and user word to add definition, example sentence, and word type | and user for context
    const createdWord = await openAIService.buildWord(word, user);

    // Check if the deck exists
    const deckFromDB = await DeckModel.findById(deckID).populate("words");

    if (!deckFromDB) {
      logging.error(NAMESPACE, `Deck with ID ${deckID} not found`);
      return res.status(400).json({ error: `${deckID} bad deckID or deck does not exist.` });
    }

    const newWord = await new WordModel({
      _id: new mongoose.Types.ObjectId(),
      deckID: new mongoose.Types.ObjectId(deckID),
      userID: new mongoose.Types.ObjectId(user._id),
      word: word,
      definition: createdWord.definition,
      wordType: createdWord.wordType,
      exampleSentence: createdWord.exampleSentence,
      conjugations: createdWord.conjugations,
    }).save();

    // Add the word to the deck's words array
    deckFromDB.words.push(newWord);
    // Update the deck in the database
    await deckFromDB.save();

    // Log the word to a file
    writeWordToFile({
      word: newWord,
      userID: user._id,
      deckID: deckID,
      timestamp: new Date().toISOString(),
    });

    return res.status(201).json({
      message: "Word created successfully!",
      deck: {
        _id: deckFromDB._id,
        userID: deckFromDB.userID,
        name: deckFromDB.name,
        description: deckFromDB.description,
        tags: deckFromDB.tags,
        creationDate: deckFromDB.creationDate,
        favorited: deckFromDB.favorited,
        words: deckFromDB.words,
      },
    });
  } catch (error) {
    logging.error(NAMESPACE, "Error creating word:", error);
    next(error);
  }
};

/*
 * ********************************************************************************************************************
 * This function is used to delete a word from a deck by its ID
 * It does NOT delete the word from the database, only from the deck
 * //! After removing the word from the deck, should the userID reference also be removed from the word object???
 * ********************************************************************************************************************
 */
const deleteWordFromDeckByID = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  try {
    // Find the word by ID
    if (!(await WordModel.findById(id))) {
      logging.error(NAMESPACE, `Word with ID ${id} not found`);
      return res.status(404).json({ error: "Word not found" });
    }

    // Find the deck associated with the word and update it by removing the word reference
    const deck = await DeckModel.findOneAndUpdate(
      { words: id },
      { $pull: { words: id } }, // MongoDB operation to remove the word from the deck's words array
      { new: true } // Return the updated deck
    ).populate("words");

    // Ensure the deck was found and updated
    if (!deck) {
      logging.error(NAMESPACE, `Failed to update deck with word ID ${id}`);
      return res.status(404).json({ error: "Failed to update deck" });
    }

    return res.status(200).json({ message: "Word delete from deck.", deck });
  } catch (error) {
    logging.error(NAMESPACE, "Error deleting word from deck:", error);
    next(error);
  }
};

export { createWord, deleteWordFromDeckByID };
