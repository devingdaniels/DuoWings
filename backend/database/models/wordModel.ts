const mongoose = require("mongoose");

const WordSchema = new mongoose.Schema({
  deckID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Deck",
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  word: {
    type: String,
    required: true,
  },
  definition: {
    type: String,
    required: true,
  },
  exampleSentence: {
    type: String,
    required: true,
  },
  wordType: {
    type: String,
    required: true,
  },
  phoneticSpelling: {
    type: String,
    required: true,
  },
  creationDate: {
    type: Date,
    default: Date.now,
    immutable: true,
  },
  isIrregular: {
    type: Boolean,
    default: false,
  },
  isFavorite: {
    type: Boolean,
    default: false,
  },
  pastParticiple: {
    //! update database and wordService.ts to include this (NOT COMPLETE)
    type: String,
    required: false,
  },
  tags: [String],
  stats: {
    level: {
      type: Number,
      min: 1,
      max: 5,
      default: 1,
    },
    correctCount: {
      type: Number,
      min: 0,
      default: 0,
    },
    incorrectCount: {
      type: Number,
      min: 0,
      default: 0,
    },
  },
  // Conjugations for the word are not required, as not all words have conjugations
  conjugations: {
    present: {
      yo: String,
      tu: String,
      el: String,
      nosotros: String,
      vosotros: String,
      ellos: String,
    },
    preterite: {
      yo: String,
      tu: String,
      el: String,
      nosotros: String,
      vosotros: String,
      ellos: String,
    },
    future: {
      yo: String,
      tu: String,
      el: String,
      nosotros: String,
      vosotros: String,
      ellos: String,
    },
    imperfect: {
      yo: String,
      tu: String,
      el: String,
      nosotros: String,
      vosotros: String,
      ellos: String,
    },
  },
  synonyms: [String],
  antonyms: [String],
});

/* 
Concurrency Handling: The $inc operator ensures that even if multiple users are updating the same word's counts at the same time, each operation will be applied correctly, preventing any loss of updates.
Performance: Atomic operations like $inc are optimized for performance and can handle high throughput, which is beneficial for applications with many concurrent users.
Simplicity: Using MongoDB's built-in atomic operators simplifies the code and reduces the complexity of manually managing atomicity, especially in distributed systems.
*/

WordSchema.methods.incrementCorrectCount = async function () {
  // Assuming `this` is the current Word document instance with a unique identifier `_id`
  await WordModel.updateOne(
    { _id: this._id }, // Filter document by its unique ID
    { $inc: { correctCount: 1 } } // Atomically increment the correctCount by 1
  );
};

WordSchema.methods.incrementIncorrectCount = async function () {
  await WordModel.updateOne({ _id: this._id }, { $inc: { incorrectCount: 1 } });
};

// Parameters: (modelName, schema, collectionName)
const WordModel = mongoose.model("Word", WordSchema, "words");

export { WordModel, WordSchema };
