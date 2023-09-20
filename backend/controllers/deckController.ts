import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import config from "../config/config";
import { DeckModel } from "../mongodb/models/deckModel";

const createDeck = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { name, description, tags, preferences, words } = req.body;

  res.status(200).json({ message: "Deck created successfully!" });
};

export { createDeck };
