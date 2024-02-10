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
  exampleSentence: String,
  wordType: {
    type: String,
    required: true,
  },
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
  stats: {
    difficulty: Number,
    creationDate: {
      type: Date,
      default: new Date(),
      immutable: false,
    },
    correctCount: {
      type: Number,
      default: 0,
    },
    incorrectCount: {
      type: Number,
      default: 0,
    },
  },
  tags: [String],
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
  await WordModel.updateOne(
    { _id: this._id },
    { $inc: { incorrectCount: 1 } }
  );
};

const WordModel = mongoose.model("Word", WordSchema, "words");

export { WordModel, WordSchema };
