import mongoose from "mongoose";

const WordDeckSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  words: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Word",
    },
  ],
  name: {
    type: String,
    required: true,
  },
  creationDate: {
    type: Date,
    default: new Date(),
    immutable: true,
  },
  isFavorite: {
    type: Boolean,
    default: false,
  },
  level: {
    type: Number,
    default: 1,
    min: 1,
    max: 5,
  },
  description: String,
  tags: [String],
});

// Parameters: (modelName, schema, collectionName)
const DeckModel = mongoose.model("Deck", WordDeckSchema, "decks");

export { DeckModel };
