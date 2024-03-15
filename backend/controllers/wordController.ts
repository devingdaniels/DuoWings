import { NextFunction, Request, Response } from "express";
import { WordModel } from "../database/models/wordModel";
import { DeckModel } from "../database/models/deckModel";
import { IWordDeck } from "../interfaces";
import mongoose from "mongoose";
import { openAIService } from "../services/openai/openaiService";
import { logNewWordToFile } from "../utils/wordCreationLog";

const NAMESPACE = "wordController";

const createWord = async (req: Request, res: Response, next: NextFunction) => {
  const { word, deckID } = req.body;
  const user = req.user;

  try {
    const deckFromDB = await DeckModel.findById(deckID);
    if (!deckFromDB) {
      return res.status(404).json({ error: `${deckID} bad deckID or deck does not exist.` });
    }
    // Use the openAI API and user word to add definition, example sentence, and word type | and user for context
    const createdWord = await openAIService.buildWord(word, user);

    // Save the output from openAI to a log file
    //! This seems to be causing the word creation to fail
    // try {
    //   logNewWordToFile({
    //     word: createdWord,
    //     userID: user._id,
    //     deckID: deckID,
    //     timestamp: new Date().toISOString(),
    //   });
    // } catch (error) {
    //   console.log("Failed to log new word to file.");
    //   console.error(NAMESPACE, error);
    // }

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

    deckFromDB.words.push(newWord);

    // Add the word to the deck
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

    return res.status(201).json({ message: "Word created successfully!", deck });
  } catch (error) {
    console.error("Backend: Error creating word:", error);
    next(error);
  }
};

/* ---------------------------------------------------------------------------------------------------------------------------- */
// This function is used to delete a word from a deck by its ID
// It does NOT delete the word from the database, only from the deck
const deleteWordFromDeckByID = async (req: Request, res: Response) => {
  // Get the wordID from the request parameters
  const { id } = req.params;

  try {
    // Find the word by ID to ensure it exists
    const word = await WordModel.findById(id);
    if (!word) {
      return res.status(404).json({ error: "Word not found" });
    }

    // Find the deck associated with the word and update it by removing the word reference
    const deck = await DeckModel.findOneAndUpdate(
      { words: id }, // Criteria to find the deck containing the word
      { $pull: { words: id } }, // MongoDB operation to remove the word from the deck's words array
      { new: true } // Return the updated deck
    ).populate("words"); // Populate to get detailed word info, if needed

    // Ensure the deck was found and updated
    if (!deck) {
      return res.status(404).json({ error: "Deck not found or word reference not removed" });
    }

    console.log(deck);

    // Return the updated deck
    return res.status(200).json({ message: "Word reference removed from deck successfully!", deck });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to remove word reference from deck" });
  }
};

export { createWord, deleteWordFromDeckByID };
