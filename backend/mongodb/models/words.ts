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
  tags: [String], // This field will store user-selected tags
  creationDate: {
    type: Date,
    default: Date.now,
    immutable: true,
  },
  preferences: {
    sortOrder: [Number],
    favorited: Boolean,
    color: String,
  },
  words: [WordSchema],
});

const WordSetModel = mongoose.model("WordDeck", WordDeckSchema);

export { WordModel, WordSetModel };
