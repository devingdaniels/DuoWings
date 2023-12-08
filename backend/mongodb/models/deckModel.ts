import mongoose from "mongoose";
import { WordSchema } from "./wordModel";

const WordDeckSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  name: {
    type: String,
    required: true,
  },
  description: String,
  tags: [String],
  creationDate: {
    type: Date,
    default: Date.now,
    immutable: true,
  },
  preferences: {
    insertOrder: [String],
    favorited: Boolean,
    // color: String,
  },
  words: [WordSchema],
});

const DeckModel = mongoose.model("Decks", WordDeckSchema, "decks");

export { DeckModel };
