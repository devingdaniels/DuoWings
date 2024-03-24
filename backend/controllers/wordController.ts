import { NextFunction, Request, Response } from "express";
import { WordModel } from "../database/models/wordModel";
import { DeckModel } from "../database/models/deckModel";
import { IWordDeck } from "../interfaces";
import mongoose from "mongoose";
import { openAIService } from "../services/openai/openaiService";
import { logNewWordToFile } from "../utils/wordCreationLog";
import { error, log } from "console";

const NAMESPACE = "wordController";

const createWord = async (req: Request, res: Response, next: NextFunction) => {
  const { word, deckID } = req.body;
  // User is added to the request object by the auth middleware if the token is valid (backend/middleware/auth.ts)
  const user = req.user;

  try {
    // Check if the deck exists
    const deckFromDB = await DeckModel.findById(deckID);

    if (!deckFromDB) {
      return res.status(404).json({ error: `${deckID} bad deckID or deck does not exist.` });
    }
    // Use the openAI API and user word to add definition, example sentence, and word type | and user for context
    const createdWord = await openAIService.buildWord(word, user);

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

    // Populate the words array to replace ObjectIds with actual word documents
    const populatedDeck = await DeckModel.findById(deckID).populate("words");

    if (!populatedDeck) {
      return res.status(404).json({ error: "Deck not found" });
    }

    // Return the updated deck
    const deck: IWordDeck = {
      _id: populatedDeck._id,
      userID: populatedDeck.userID,
      name: populatedDeck.name,
      description: populatedDeck.description,
      tags: populatedDeck.tags,
      creationDate: populatedDeck.creationDate,
      favorited: populatedDeck.favorited,
      words: populatedDeck.words,
    };

    await logNewWordToFile({
      word: createdWord,
      userID: user._id,
      deckID: deckID,
      timestamp: new Date().toISOString(),
    })
      .then((result) => {
        if (result === 1) {
          console.log("Word added to log file");
        } else {
          console.log("Error adding word not added to log file");
        }
      })
      .catch((error) => {
        console.error(error);
      });

    return res.status(201).json({ message: "Word created successfully!", deck });
  } catch (error) {
    console.error("Backend: Error creating word:", error);
    next(error);
  }
};

/*
 * ********************************************************************************************************************
 * This function is used to delete a word from a deck by its ID
 * It does NOT delete the word from the database, only from the deck
 * //! Should the userID be removed as a reference from the word???
 * ********************************************************************************************************************
 */
const deleteWordFromDeckByID = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  try {
    // Find the word by ID to ensure it exists
    if (!(await WordModel.findById(id))) {
      return res.status(404).json({ error: "Word not found" });
    }
    // Find the deck associated with the word and update it by removing the word reference
    const deck = await DeckModel.findOneAndUpdate(
      { words: id },
      { $pull: { words: id } }, // MongoDB operation to remove the word from the deck's words array
      { new: true } // Return the updated deck
    ).populate("words"); // Populate to get detailed word info

    // Ensure the deck was found and updated
    if (!deck) {
      return res.status(404).json({ error: "Deck not found or word reference not removed" });
    }

    return res.status(200).json({ message: "Word reference removed from deck successfully!", deck });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export { createWord, deleteWordFromDeckByID };
