import mongoose from "mongoose";

const WordSchema = new mongoose.Schema({
  word: {
    type: String,
    required: true,
  },
  englishDefinition: String,
  exampleSentence: String,
  wordType: String,
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
    type: Date,
  },
  lastIncorrectDate: {
    type: Date,
  },
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

const WordSetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  words: [WordSchema],
});

const WordSetModel = mongoose.model("WordSet", WordSetSchema);

export { WordModel, WordSetModel };
