import { DeckModel } from "../database/models/deckModel";
import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

const NAMESPACE = "DeckController";

// https://chat.openai.com/share/b7c085f3-a91d-495c-a881-b94d2ad177b9

const createDeck = async (req: Request, res: Response): Promise<void> => {
  const { name, description } = req.body;
  try {
    // Check if a deck with the same name already exists for this user
    if (await DeckModel.findOne({ name, userID: req.user._id })) {
      res.status(409).json({ error: `Deck ${name} already exists` });
      return;
    }

    // Create and save new deck
    const deck = await new DeckModel({
      _id: new mongoose.Types.ObjectId(),
      userID: req.user._id,
      name,
      description,
      tags: [],
      preferences: {
        insertOrder: ["newest"],
        isFavorite: false,
      },
      words: [],
    }).save();

    // Send the deck back to the client
    res.status(201).json({ message: `${name} created successfully`, deck });

    // Catch any errors and send a 500 status code
  } catch (error) {
    console.error(`${NAMESPACE}: Error creating deck:`, error);
    res.status(500).json({ error: "Failed to create deck" });
  }
};

const fetchAllDecks = async (req: Request, res: Response): Promise<void> => {
  try {
    // Find all decks for the user and populate the 'words' field to get the associated words
    const decksFromDB = await DeckModel.find({ userID: req.user._id }).populate("words");

    // Transform the decks to include word details
    const decks = decksFromDB.map((deck) => {
      return {
        ...deck.toObject(),
        words: deck.words,
      };
    });

    res.status(200).json(decks);
  } catch (error) {
    console.error(`${NAMESPACE}: Error fetching decks:`, error);
    res.status(500).json({ error: "Failed to fetch decks" });
  }
};

/* -------------------------------------------------------------------------------------------------- */

const fetchDeckByID = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const deck = await DeckModel.findOne({ userID: req.user._id, _id: req.params });
    res.status(200).json(deck);
  } catch (error) {
    console.error(`${NAMESPACE}: Error fetching deck by ID:`, error);
    next(error);
  }
};

/* -------------------------------------------------------------------------------------------------- */
const deleteDeckByID = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const result = await DeckModel.findOneAndDelete({ userID: req.user._id, _id: req.params.id });

    // Deck not found
    if (!result) {
      res.status(404).json({ message: "Deck not found" });
      return;
    }
    res.status(200).json({ message: "Deck deleted successfully" });
  } catch (error: any) {
    console.error(`${NAMESPACE}: Error deleting deck:`, error);
    res.status(500).json({ message: "Internal Server Error" });
    next(error);
  }
};

export { createDeck, fetchAllDecks, fetchDeckByID, deleteDeckByID };
