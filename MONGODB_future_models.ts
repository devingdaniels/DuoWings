import mongoose from "mongoose";

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
  },
  wordInsertOrder: [Number],
  // Gamification Fields
  experiencePoints: {
    type: Number,
    default: 0,
  },
  level: {
    type: Number,
    default: 1,
  },
  completedChallenges: [String],
  badges: [String],
  streak: {
    type: Number,
    default: 0,
  },
  lastStreakDate: {
    type: Date,
  },
});

// DailyChallenge Schema
const dailyChallengeSchema = new mongoose.Schema({
  wordSet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "WordSet",
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

// Leaderboard Schema
const leaderboardSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  score: Number,
  rank: Number,
});

// Badge Schema
const badgeSchema = new mongoose.Schema({
  name: String,
  description: String,
  criteria: {
    // Define criteria for earning the badge
  },
});

// UserPreferences Schema
const userPreferencesSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  darkMode: Boolean,
  notifications: Boolean,
  difficultyLevel: String,
});

const rewq = new mongoose.Schema({
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

    immutable: false,
  },

  preferences: {
    insertOrder: [String],
    favorited: Boolean,
  },

  words: [
    {
      type: mongoose.Schema.Types.ObjectId,

      ref: "Word",
    },
  ],

  lastStudied: {
    type: Date.now,
  },

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
