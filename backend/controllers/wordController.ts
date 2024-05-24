import { DeckModel } from "../database/models/deckModel";
import logging from "../config/logging";
import { writeWordToFile } from "../utils/wordCreationLog";
import mongoose from "mongoose";
import { NextFunction, Request, Response } from "express";
import { openAIService } from "../services/openai/openaiService";
import { WordModel } from "../database/models/wordModel";
import { IWord } from "../interfaces";

const NAMESPACE = "wordController.ts";
const DEBUGGING = process.env.DEBUGGING === "true";

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
    // If the word already exists, then we don't need to call the openAI API
    // We can just copy copy the conjugations, definition, example sentence, and word type from the existing word
    // This is useful for when a user adds a word to a deck that already exists in the database

    let createdWord;

    // Check if the word already exists in the database
    const isWordInDB = await WordModel.findOne({ word: word });

    console.log("isWordInDB", isWordInDB);

    if (isWordInDB) {
      //! We should do this dynamically with a for loop and then delete the properties that are not needed (lkke userID, deckID, etc.)
      createdWord = {
        conjugations: isWordInDB.conjugations,
        definition: isWordInDB.definition,
        exampleSentence: isWordInDB.exampleSentence,
        phoneticSpelling: isWordInDB.phoneticSpelling,
        wordType: isWordInDB.wordType,
        isIrregular: isWordInDB.isIrregular,
      };
      if (DEBUGGING) console.log("Word already exists in the database. Skipping openAI API call.");
    } else {
      // Use the openAI API and user word to add definition, example sentence
      createdWord = await openAIService.buildWord(word);
    }

    // Check if the deck exists
    const deckFromDB = await DeckModel.findById(deckID).populate("words");

    if (!deckFromDB) {
      logging.error(NAMESPACE, `Deck with ID ${deckID} not found`);
      return res.status(400).json({ error: `${deckID} bad deckID or deck does not exist.` });
    }

    // Create the new word and save it to the database
    const newWord = await new WordModel({
      _id: new mongoose.Types.ObjectId(),
      deckID: new mongoose.Types.ObjectId(deckID),
      userID: new mongoose.Types.ObjectId(user._id),
      word: word,
      definition: createdWord.definition,
      wordType: createdWord.wordType,
      exampleSentence: createdWord.exampleSentence,
      phoneticSpelling: createdWord.phoneticSpelling,
      isIrregular: createdWord.isIrregular,
      conjugations: createdWord.conjugations,
      isFavorite: false,
    }).save();

    console.log("newWord", newWord);

    // Add the word to the deck's words array
    deckFromDB.words.push(newWord);
    // Update the deck in the database
    await deckFromDB.save();

    // Log the word to a file
    writeWordToFile({
      word: newWord,
      timestamp: new Date().toISOString(),
    });

    // Return the updated deck with the new word
    return res.status(201).json({
      message: "Word created successfully!",
      deck: {
        _id: deckFromDB._id,
        userID: deckFromDB.userID,
        name: deckFromDB.name,
        description: deckFromDB.description,
        tags: deckFromDB.tags,
        creationDate: deckFromDB.creationDate,
        isFavorite: deckFromDB.isFavorite,
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
 * It does NOT delete the word from the Words document portion of the database, only from the deck it is associated with
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

/*
 * ********************************************************************************************************************
 * Input: word object with new values, word ID
 * This function is used to update a word in a deck by its ID
 * It updates the word's properties (e.g., word, definition, example sentence, word type, etc.)
 * It returns a 201 status code and the updated deck with the updated word
 * ********************************************************************************************************************
 */
const updateWordInDeckByID = async (req: Request, res: Response, next: NextFunction) => {
  const word = req.body;
  const { id } = req.params;

  try {
    // Find the word
    const wordFromDB = await WordModel.findById(id);

    if (!wordFromDB) {
      logging.error(NAMESPACE, `Word with ID ${id} not found`);
      return res.status(404).json({ error: "Word not found" });
    }

    // Update the word
    const updatedWord = await WordModel.updateOne(
      { _id: id },
      {
        $set: {
          word: word.word,
          definition: word.definition,
          exampleSentence: word.exampleSentence,
          wordType: word.wordType,
          conjugations: word.conjugations,
        },
      }
    );

    if (updatedWord.nModified === 0) {
      logging.error(NAMESPACE, `Failed to update word with ID ${id}`);
      return res.status(400).json({ error: "Failed to update word" });
    }

    // Update the deck with the updated word
    const deck = await DeckModel.findById(word.deckID).populate("words");

    return res.status(201).json({ message: "Update successful", deck });
  } catch (error) {
    logging.error(NAMESPACE, "Error updating word:", error);
    next(error);
  }
};

/*
 * ********************************************************************************************************************
 * Input: wordID, deckID, !isFavorite
 * This function is used to toggle a word's favorite status
 * It returns a 201 status code and the updated deck with the updated word
 * else it returns a 400 status code and an error message
 * ********************************************************************************************************************
 */
const toggleFavorite = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const wordID = id;

  try {
    // Find the word
    const word = await WordModel.findById(wordID);

    if (!word) {
      logging.error(NAMESPACE, `Word with ID ${wordID} not found`);
      return res.status(404).json({ error: "Word not found" });
    }

    // Update the word's favorite status
    const updatedWord = await WordModel.updateOne(
      { _id: wordID },
      {
        $set: {
          isFavorite: !word.isFavorite,
        },
      }
    );

    if (updatedWord.nModified === 0) {
      logging.error(NAMESPACE, `Failed to update word with ID ${wordID}`);
      return res.status(400).json({ error: "Failed to update word" });
    }

    // Update the deck with the updated word
    const deck = await DeckModel.findById(word.deckID).populate("words");

    return res.status(201).json({ message: "Update successful", deck });
  } catch (error) {
    logging.error(NAMESPACE, "Error updating word:", error);
    next(error);
  }
};

export { createWord, deleteWordFromDeckByID, updateWordInDeckByID, toggleFavorite };
