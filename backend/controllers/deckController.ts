import { DeckModel } from "../database/models/deckModel";
import { Request, Response } from "express";
import mongoose from "mongoose";

const NAMESPACE = "DeckController";

const createDeck = async (req: Request, res: Response): Promise<void> => {
  const { name, description } = req.body;
  try {
    // Check if a deck with the same name already exists for this user
    if (await DeckModel.findOne({ name, userID: req.user._id })) {
      res.status(404);
      throw new Error(`Deck ${name} already exists`);
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
        favorited: false,
      },
      words: [],
    }).save();
    // Send the deck back to the client
    res.status(201).json({ message: `${name} created successfully`, deck });
  } catch (error) {
    console.error(`${NAMESPACE}: Error creating deck:`, error);
    res.status(500).json({ error: "Failed to create deck" });
  }
};

const fetchAllDecks = async (req: Request, res: Response): Promise<void> => {
  try {
    const decks = await DeckModel.find({ userID: req.user._id });
    res.status(200).json(decks);
  } catch (error) {
    console.error(`${NAMESPACE}: Error fetching decks:`, error);
    res.status(500).json({ error: "Failed to fetch decks" });
  }
};

const fetchDeckByID = async (req: Request, res: Response): Promise<void> => {
  try {
    const deck = await DeckModel.findOne({ userID: req.user._id, _id: req.params.id });
    res.status(200).json(deck);
  } catch (error) {
    console.error("Error fetching decks:", error);
    res.status(500).json({ error: "Failed to fetch decks" });
  }
};

const deleteDeckByID = async (req: Request, res: Response): Promise<void> => {
  try {
    await DeckModel.findOneAndDelete({ userID: req.user._id, _id: req.params.id });
    res.status(200).json({ message: "Deck deleted successfully" });
  } catch (error) {
    console.error("Error fetching decks:", error);
    res.status(500).json({ error: "Failed to fetch decks" });
  }
};

export { createDeck, fetchAllDecks, fetchDeckByID, deleteDeckByID };
