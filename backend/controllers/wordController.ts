import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { WordModel } from "../mongodb/models/wordModel";

const createWord = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    console.log("Backend: req.body:", req.body);
    res.status(201).json({ message: "Implement creating a new word from the deckIID" });
  } catch (error) {
    console.error("Backend: Error creating deck:", error);
    res.status(500).json({ error: "Failed to create deck" });
  }
};

export { createWord };
