const mongoose = require("mongoose");

const WordSchema = new mongoose.Schema({
  word: {
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
  creationDate: {
    type: Date,
    default: Date.now,
    immutable: false,
  },
  difficulty: Number,
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
