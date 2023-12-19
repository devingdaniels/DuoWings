import { Request, Response } from "express";
import mongoose from "mongoose";
import { DeckModel } from "../database/models/deckModel";

const NAME_SPACE = "DeckController";

const createDeck = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, description } = req.body;
    const userId = req.user;
    // Check if a deck with the same name already exists for this user
    const existingDeck = await DeckModel.findOne({ name, user: userId });
    // Duplicate deck names are not allowed
    if (existingDeck) {
      res.status(404);
      throw new Error(`Deck ${name} already exists`);
    }
    const deck = new DeckModel({
      _id: new mongoose.Types.ObjectId(),
      user: userId,
      name,
      description,
      tags: [],
      preferences: {
        insertOrder: ["newest"],
        favorited: false,
      },
      words: [],
    });

    // Save the deck to DB
    await deck.save();
    res.status(201).json({ message: `${name} created successfully`, deck });
  } catch (error) {
    console.error(`${NAME_SPACE}: Error creating deck:`, error);
    res.status(500).json({ error: "Failed to create deck" });
  }
};

const fetchAllDecks = async (req: Request, res: Response): Promise<void> => {
  try {
    // Assuming req.user contains user information including _id
    const userId = req.user;
    // Fetch decks specific to the user from the database
    const decks = await DeckModel.find({ user: userId });
    // Return all decks
    res.status(200).json(decks);
  } catch (error) {
    console.error(`${NAME_SPACE}: Error fetching decks:`, error);
    res.status(500).json({ error: "Failed to fetch decks" });
  }
};

const fetchDeckByID = async (req: Request, res: Response): Promise<void> => {
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

const deleteDeckByID = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user;
    const deckId = req.params.id;
    // Fetch decks specific to the user from the database
    await DeckModel.findOneAndDelete({ user: userId, _id: deckId });
    // Return the list of user-specific decks in the response
    res.status(200).json({ message: "Deck deleted successfully" });
  } catch (error) {
    console.error("Error fetching decks:", error);
    res.status(500).json({ error: "Failed to fetch decks" });
  }
};

export { createDeck, fetchAllDecks, fetchDeckByID, deleteDeckByID };
