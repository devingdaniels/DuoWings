const mongoose = require("mongoose");

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
  userPerformance: [
    {
      userId: {
        type: String,
      },
      tense: String,
      correctCount: Number,
      incorrectCount: Number,
      lastAttemptDate: Date,
    },
  ],
  difficulty: Number,
  tags: [String],
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

export const WordModel = mongoose.model("Word", WordSchema, "words");
