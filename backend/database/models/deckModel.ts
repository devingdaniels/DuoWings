import mongoose from "mongoose";

const WordDeckSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  words: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Word",
    },
  ],
  name: {
    type: String,
    required: true,
  },
  description: String,
  tags: [String],
  creationDate: {
    type: Date,
    default: new Date(),
    immutable: true,
  },
  isFavorite: {
    type: Boolean,
    default: false,
  },
});

/*
If you often need to know the number of words in a deck without needing the word details, you can use a virtual property. 
This property won't be persisted in the database but can be computed on the fly when you query a deck.
*/
WordDeckSchema.virtual("wordCount").get(function () {
  return this.words.length;
});

// Parameters: (modelName, schema, collectionName)
const DeckModel = mongoose.model("Deck", WordDeckSchema, "decks");

export { DeckModel };

// Other possible fields for the schema

/*
Language Field: Specify the language of the words in the deck. This is useful for users who are learning multiple languages. 
During registration, you can ask users to specify their primary languag, and then use it by default, or allow them to change it later when 
creating a new deck

Shared Status: Indicate whether a deck is private or can be shared with other users. This encourages community learning and sharing.

Progress Tracking: Include fields to track the learner's progress with the deck, such as lastStudiedDate and studyStreak.

Difficulty Level: Consider adding an overall difficulty level for the deck based on the aggregated difficulty of the words it contains.

Access Control: Add fields to manage permissions, such as whether a deck can be edited or only viewed by others.

*/
