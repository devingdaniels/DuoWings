import mongoose from "mongoose";

const DialogueSchema = new mongoose.Schema({
  messages: [
    {
      text: {
        type: String,
        required: true,
      },
      sender: {
        type: String, // "user" or "tutor"
        required: true,
      },
      timestamp: {
        type: Date,
        default: Date.now,
      },
      confidence: {
        type: Number, // AI confidence score for tutor messages
      },
      responseType: {
        type: String, // E.g., "introductory", "clarifying", "informative"
      },
    },
  ],
  context: {
    type: mongoose.Schema.Types.Mixed, // Store conversation context if needed
  },
});

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

const UserSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: true,
    min: 3,
    max: 20,
  },
  lname: {
    type: String,
    required: true,
    min: 3,
    max: 20,
  },
  username: {
    type: String,
    required: true,
    min: 3,
    max: 20,
    unique: true,
    index: true,
    lowercase: true,
  },
  email: {
    type: String,
    required: true,
    max: 50,
    unique: true,
    index: true,
    lowercase: true,
  },
  phonenumber: {
    type: String,
    required: true,
    max: 20,
  },
  hashedPassword: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  dialogues: [DialogueSchema],
  vocabulary: [VocabularySchema],
  profilePicture: {
    type: String,
    default: "",
  },
  tokens: [
    {
      token: {
        type: String, // Store JWT tokens
        required: true,
      },
      expiresAt: {
        type: Date,
        required: true,
      },
    },
  ],
});
const User = mongoose.model("User", UserSchema);

export { User };
