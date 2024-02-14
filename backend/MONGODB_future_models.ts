import mongoose from "mongoose";

const WordSchema = new mongoose.Schema({
  word: {
    type: String,
    required: true,
  },
  englishDefinition: {
    type: String,
    required: true,
  },
  wordType: {
    // noun, verb, adjective, etc.
    type: String,
    required: true,
  },
  conjugation: {
    // present, past, future, etc.
    type: String,
    required: true,
  },
  correctCount: {
    type: Number,
    default: 0,
  },
  incorrectCount: {
    type: Number,
    default: 0,
  },
  lastCorrectDate: {
    type: [Date],
  },
  lastIncorrectDate: {
    type: [Date],
  },
  creationDate: {
    type: Date,
    required: true,
  },
  difficulty: {
    type: Number,
    default: 0,
  },
  tags: [String], // This field will store user-selected tags
  exampleSentence: String,
});

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
  insertOrder: [Number],
  words: [WordSchema],
  // Gamification Fields
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

// QuizResult Schema
const quizResultSchema = new mongoose.Schema({
  wordSet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "WordSet",
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  score: Number,
  date: {
    type: Date,
    default: Date.now,
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
