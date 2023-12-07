import { Request, Response } from "express";
import { WordModel } from "../mongodb/models/wordModel";
import { DeckModel } from "../mongodb/models/deckModel";

const createWord = async (req: Request, res: Response): Promise<void> => {
  try {
    const { word, deckID } = req.body;

    // Get the deck from the DB
    const deck = await DeckModel.findById(deckID);

    if (!deck) {
      res.status(404).json({ error: "Deck not found" });
    }
    // Here will be a micoserver call to add word details like defintion, example, conjugations, etc.

    // Create a new word
    const newWord = new WordModel({
      word: word,
    });

    // Save the word to the DB
    await newWord.save();

    // Add the word to the deck

    deck!.words.push(newWord._id);
    await deck!.save();

    res.status(201).json({ message: "Word created and added to the deck successfully" });
  } catch (error) {
    console.error("Backend: Error creating word:", error);
    res.status(500).json({ error: "Failed to create word" });
  }
};

export { createWord };
