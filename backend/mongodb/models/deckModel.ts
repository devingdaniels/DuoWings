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

  lastStudied: {
    type: Date,
    default: Date.now,
  },

  // Gamification Fields (This needs to be implemented in the frontend )
  experiencePoints: {
    type: Number,
    default: 0,
  },
  level: {
    type: Number,
    default: 1,
  },
  completedChallenges: [String], // IDs or names of completed challenges
  badges: [String], // IDs or names of earned badges
  streak: {
    type: Number,
    default: 0,
  },
  lastStreakDate: {
    type: Date,
  },
});

const DeckModel = mongoose.model("Decks", WordDeckSchema, "decks");

export { DeckModel };
