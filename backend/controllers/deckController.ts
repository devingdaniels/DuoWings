import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { DeckModel } from "../mongodb/models/deckModel";

const createDeck = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { name, description, tags, insertOrder } = req.body;
    const userId = req.user;

    console.log("Backend: Creating deck:", req.body);

    // Check if a deck with the same name already exists for this user
    const existingDeck = await DeckModel.findOne({ name, user: userId });

    if (existingDeck) {
      res.status(404);
      throw new Error(`Deck with name ${name} already exists for this user`);
    }

    const deck = new DeckModel({
      user: userId,
      _id: new mongoose.Types.ObjectId(),
      name,
      description,
      tags,
      preferences: {
        insertOrder,
      },
      createdBy: userId, // Associate the deck with the user
    });

    await deck.save();

    res.status(201).json({ message: "Deck created successfully", deck });
  } catch (error) {
    console.error("Backend: Error creating deck:", error);
    res.status(500).json({ error: "Failed to create deck" });
  }
};

const fetchAllDecks = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Assuming req.user contains user information including _id
    const userId = req.user;

    // Fetch decks specific to the user from the database
    const decks = await DeckModel.find({ user: userId });

    // Return the list of user-specific decks in the response
    res.status(200).json(decks);
  } catch (error) {
    console.error("Error fetching decks:", error);
    res.status(500).json({ error: "Failed to fetch decks" });
  }
};

const fetchDeckByID = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user;
    const deckId = req.params.id;
    // Fetch decks specific to the user from the database
    const deck = await DeckModel.findOne({ user: userId, _id: deckId });
    // Return the list of user-specific decks in the response
    res.status(200).json(deck);
  } catch (error) {
    console.error("Error fetching decks:", error);
    res.status(500).json({ error: "Failed to fetch decks" });
  }
};

export { createDeck, fetchAllDecks, fetchDeckByID };
