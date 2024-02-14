import { Request, Response } from "express";
import { WordModel } from "../database/models/wordModel";
import { DeckModel } from "../database/models/deckModel";
import { IWordDeck } from "../interfaces";
import mongoose from "mongoose";
import { openAIService } from "../services/openai/openaiService";
import { logNewWordToFile } from "../utils/wordCreationLog";

const NAMESPACE = "wordController";

const createWord = async (req: Request, res: Response) => {
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
    logNewWordToFile({
      word: createdWord,
      userID: user._id,
      deckID: deckID,
    }).catch((error) => console.error(NAMESPACE, error));

    // Create a new word document
    const newWord = new WordModel({
      _id: new mongoose.Types.ObjectId(),
      deckID: deckID,
      userID: user._id,
      word: word,
      definition: createdWord.definition,
      wordType: createdWord.wordType,
      exampleSentence: createdWord.exampleSentence,
      conjugations: createdWord.conjugations,
    });

    // Save the word to the database
    const savedWord = await newWord.save();

    // Add the word to the deck
    deckFromDB.words.push(savedWord);
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
    res.status(500).json({ error: "Failed to create word" });
  }
};

/* ---------------------------------------------------------------------------------------------------------------------------- */

const deleteWordByID = async (req: Request, res: Response) => {
  // Get the wordID from the request body
  const { id } = req.params;

  try {
    // Find the word by ID and delete it
    const deletedWord = await WordModel.findByIdAndDelete(id);
    console.log(NAMESPACE, deletedWord);

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
    console.log(NAMESPACE, error);
    res.status(500).json({ error: "Failed to delete word" });
  }
};

export { createWord, deleteWordByID };
