import axios from "axios";
import { ICreateNewDeck, ICreateNewVocabWord } from "../interfaces/index";

// Backend server URL
const URL = import.meta.env.VITE_BACKEND_API_DECK;

const createDeck = async (deck: ICreateNewDeck) => {
  try {
    const response = await axios.post(URL + "/create-deck", deck);
    return response.data;
  } catch (err: any) {
    if (err.response && err.response.data) {
      console.error(err.response.data);
      throw new Error(err.response.data);
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
      console.error(err.response.data);
      throw new Error(err.response.data);
    } else {
      console.error("Error:", err);
      throw new Error("Error: Failed to fetch decks");
    }
  }
};

const fetchDeckByID = async (deckID: string) => {
  try {
    const response = await axios.get(URL + `/${deckID}`);
    return response.data;
  } catch (err: any) {
    if (err.response && err.response.data) {
      console.error(err.response.data);
      throw new Error(err.response.data);
    } else {
      console.error("Error:", err);
      throw new Error(`Error: Failed to fetch deck with ID: ${deckID}`);
    }
  }
};

const deleteDeckByID = async (deckID: string) => {
  try {
    const response = await axios.delete(URL + `/${deckID}`);
    return response.data;
  } catch (err: any) {
    if (err.response && err.response.data) {
      console.error(err.response.data);
      throw new Error(err.response.data);
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
    return response.data;
  } catch (err: any) {
    if (err.response && err.response.data) {
      console.error(err.response.data);
      throw new Error(err.response.data);
    } else {
      console.error("Error:", err);
      throw new Error(`Failed to create word.`);
    }
  }
};

const VocabService = {
  createDeck,
  createWord,
  fetchDeckByID,
  fetchAllDecks,
  deleteDeckByID,
};

export { VocabService };
