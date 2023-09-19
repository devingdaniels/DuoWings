import mongoose from "mongoose";
import { WordSchema } from "./wordModel";

const WordDeckSchema = new mongoose.Schema({
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
    insertOrder: [Number],
    favorited: Boolean,
    // color: String,
  },
  words: [WordSchema],

  // Gamification Fields (This needs to be implemented in the frontend w/updated interface)
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

const WordSetModel = mongoose.model("WordDeck", WordDeckSchema);

export { WordSetModel };
