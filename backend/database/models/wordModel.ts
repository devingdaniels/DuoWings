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
  },
  tags: [String],
});

// WordSchema.methods.incrementCorrectCount = async function () {
//   this.correctCount += 1;
//   this.lastCorrectDate = new Date();
//   await this.save();
// };

// WordSchema.methods.incrementIncorrectCount = async function () {
//   this.incorrectCount += 1;
//   this.lastIncorrectDate = new Date();
//   await this.save();
// };

const WordModel = mongoose.model("Word", WordSchema, "words");

export { WordModel, WordSchema };
