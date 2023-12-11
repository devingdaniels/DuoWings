import { Request, Response } from "express";
import { WordModel } from "../mongodb/models/wordModel";
import { DeckModel } from "../mongodb/models/deckModel";

const createWord = async (req: Request, res: Response) => {
  // Get the word and deckID from the request body
  // Get the userID from the request user assigned by middleware
  const { word, deckID } = req.body;
  const userID = req.user;

  try {
    // Get the deck from the DB
    const deck = await DeckModel.findById(deckID);

    if (!deck) {
      return res.status(404).json({ error: "Error getting deck" });
    }

    // Create a new word
    const newWord = new WordModel({
      word,
      definition: "To speak",
      exampleSentence: "Yo quiero hablar español",
      wordType: "verb",
      conjugations: {
        present: {
          yo: "hablo",
          tu: "hablas",
          el: "habla",
          nosotros: "hablamos",
          vosotros: "habláis",
          ellos: "hablan",
        },
      },
      difficulty: 0,
      tags: [],
    });

    await newWord.save();
    deck!.words.push(newWord);
    await deck!.save();
    res.status(201).json({ message: "Word created and added to the deck successfully", deck });
    console.log("Backend: Word created and added to the deck successfully");
  } catch (error) {
    console.error("Backend: Error creating word:", error);
    res.status(500).json({ error: "Failed to create word" });
  }
};

export { createWord };
