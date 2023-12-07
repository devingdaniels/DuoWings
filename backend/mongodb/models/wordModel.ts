const mongoose = require("mongoose");

const WordSchema = new mongoose.Schema({
  word: {
    type: String,
    required: true,
  },
  definition: {
    type: String,
    required: true,
  },
  wordType: {
    type: String,
    required: true,
  },
  exampleSentence: String,
  tags: [String],
  conjugationsByTense: {
    type: Map,
    of: [
      {
        conjugatedForm: String,
        correctCount: Number,
        incorrectCount: Number,
      },
    ],
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  deckID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  userPerformance: [
    {
      tense: String,
      correctCount: Number,
      incorrectCount: Number,
      lastAttemptDate: Date,
    },
  ],
  difficulty: Number,
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

export const WordModel = mongoose.model("Word", WordSchema, "words");
