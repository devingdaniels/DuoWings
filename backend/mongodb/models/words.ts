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
    type: String,
    required: true,
  },
  conjugation: String,
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
  tags: [String], //
  exampleSentence: String,
  userNotes: String,
});

WordSchema.methods.incrementCorrectCount = async function () {
  this.correctCount += 1;
  this.lastCorrectDate = new Date();
  await this.save();
};

WordSchema.methods.incrementIncorrectCount = async function () {
  this.incorrectCount += 1;
  this.lastIncorrectDate = new Date();
  await this.save();
};

const WordModel = mongoose.model("Word", WordSchema);

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

export { WordModel, WordSetModel };
