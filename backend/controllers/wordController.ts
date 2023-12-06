import { Request, Response, NextFunction } from "express";
// import { WordModel } from "../mongodb/models/wordModel";

const createWord = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log("Backend: req.body:", req.body);
    // Get the deck  ID from req.body or req.params
    // Get Deck from DB
    // Create a new word
    // Save the word to the DB and add the word to the deck
    res.status(201).json({ message: "Implement creating a new word from the deckIID" });
  } catch (error) {
    console.error("Backend: Error creating deck:", error);
    res.status(500).json({ error: "Failed to create deck" });
  }
};

export { createWord };
