import axios from "axios";
// Type
import { ICreateNewDeck } from "../interfaces/index";
import { ICreateNewVocabWord } from "../interfaces/index";

// Backend server URL
const URL = import.meta.env.VITE_BACKEND_API_DECK;

const createDeck = async (deck: ICreateNewDeck) => {
  try {
    const response = await axios.post(URL + "/create-deck", deck);
    // Success: 201 and new deck object
    return response.data;
  } catch (err: any) {
    if (err.response && err.response.data) {
      console.error(err.response.data.message);
      throw new Error(err.response.data.message);
    } else {
      console.error("Error:", err);
      throw new Error(`Failed to create deck.`);
    }
  }
};

const fetchAllDecks = async () => {
  try {
    const response = await axios.get(URL);
    return response.data;
  } catch (err: any) {
    if (err.response && err.response.data) {
      console.error(err.response.data.message);
      throw new Error(err.response.data.message);
    } else {
      console.error("Error:", err);
      throw new Error("Error: Failed to fetch decks");
    }
  }
};

const fetchDeckByID = async (deckID: string) => {
  try {
    const response = await axios.get(URL + `/${deckID}`);
    const deck = await response.data;
    return deck;
  } catch (err: any) {
    if (err.response && err.response.data) {
      console.error(err.response.data.message);
      throw new Error(err.response.data.message);
    } else {
      console.error("Error:", err);
      throw new Error(`Error: Failed to fetch deck with ID: ${deckID}`);
    }
  }
};

const deleteDeckByID = async (deckID: string) => {
  try {
    const response = await axios.delete(URL + `/${deckID}`);
    const deck = await response.data;
    return deck;
  } catch (err: any) {
    if (err.response && err.response.data) {
      console.error(err.response.data.message);
      throw new Error(err.response.data.message);
    } else {
      console.error("Error:", err);
      throw new Error(`Error: Failed to delete deck with ID: ${deckID}`);
    }
  }
};

const createWord = async (word: ICreateNewVocabWord) => {
  const URL = import.meta.env.VITE_BACKEND_API_WORD + "/create-word";
  try {
    const response = await axios.post(URL, word);
    // Backend returns 201 and the new word
    console.log("wordService:", response.data);
    return response.data;
  } catch (err: any) {
    if (err.response && err.response.data) {
      console.error(err.response.data.message);
      throw new Error(err.response.data.message);
    } else {
      console.error("Error:", err);
      throw new Error(`Failed to create word.`);
    }
  }
};

const VocabService = {
  createDeck,
  fetchDeckByID,
  fetchAllDecks,
  deleteDeckByID,
  createWord,
};

export { VocabService };
