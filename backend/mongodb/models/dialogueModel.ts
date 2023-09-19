import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
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
});

const dialogueSchema = new mongoose.Schema({
  messages: [messageSchema],
  context: {
    type: mongoose.Schema.Types.Mixed, // Store conversation context if needed
  },
});

const Dialogue = mongoose.model("Dialogue", dialogueSchema);

export default Dialogue;
