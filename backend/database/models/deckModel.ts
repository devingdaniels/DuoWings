import mongoose from "mongoose";
import { WordSchema } from "./wordModel";

const WordDeckSchema = new mongoose.Schema({
  userID: {
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
    default: new Date(),
    immutable: true,
  },
  favorited: {
    type: Boolean,
    default: false,
  },

  words: [WordSchema],
});

// Parameters: (modelName, schema, collectionName)
const DeckModel = mongoose.model("Decks", WordDeckSchema, "decks");

export { DeckModel };
