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
    type: [Date],
  },
  lastIncorrectDate: {
    type: [Date],
  },
  tags: [String],
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
  words: [WordSchema],
});

WordDeckSchema.methods.addWord = async function (word: String) {
  // Get user's word deck
  const wordDeck = await WordSetModel.findById(this._id);
  // Add word to word deck
};

const WordSetModel = mongoose.model("WordDeck", WordDeckSchema);

export { WordModel, WordSetModel };
