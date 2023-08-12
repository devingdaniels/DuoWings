import mongoose from "mongoose";

const VocabularySchema = new mongoose.Schema({
  word: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  meaning: {
    type: String,
    required: true,
  },
  exampleSentence: {
    type: String,
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
    type: Date,
  },
  lastIncorrectDate: {
    type: Date,
  },
});

// Methods to update statistics
VocabularySchema.methods.markCorrect = function () {
  this.correctCount++;
  this.lastCorrectDate = new Date();
  return this.save();
};

VocabularySchema.methods.markIncorrect = function () {
  this.incorrectCount++;
  this.lastIncorrectDate = new Date();
  return this.save();
};

const Vocabulary = mongoose.model("Vocabulary", VocabularySchema);

export default Vocabulary;
