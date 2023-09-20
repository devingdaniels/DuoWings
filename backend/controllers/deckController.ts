import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { DeckModel } from "../mongodb/models/deckModel";

const createDeck = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { name, description, tags, insertOrder } = req.body;

    // Check if a deck with the same name already exists
    const existingDeck = await DeckModel.findOne({ name });

    if (existingDeck) {
      res.status(404);
      throw new Error("A deck with the same name already exists");
    }

    const deck = new DeckModel({
      _id: new mongoose.Types.ObjectId(),
      name,
      description,
      tags,
      insertOrder,
    });

    await deck.save();

    res.status(201).json({ message: "Deck created successfully", deck });
  } catch (error) {
    console.error("Error creating deck:", error);
    res.status(500).json({ error: "Failed to create deck" });
  }
};

const fetchAllDecks = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Fetch all decks from the database
    const decks = await DeckModel.find();

    // Return the list of decks in the response
    res.status(200).json(decks);
  } catch (error) {
    console.error("Error fetching decks:", error);
    res.status(500).json({ error: "Failed to fetch decks" });
  }
};

export { createDeck, fetchAllDecks };
