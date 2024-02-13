import Axios from "axios";
import { ICreateNewDeck, ICreateNewVocabWord } from "../interfaces/index";

Axios.defaults.withCredentials = true;

const NAMESPACE = "vocabService.ts";

// Backend server URL

const createDeck = async (deck: ICreateNewDeck) => {
  const URL = import.meta.env.VITE_BACKEND_API_DECK;
  try {
    const response = await Axios.post(URL + "/create-deck", deck);
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
  const URL = import.meta.env.VITE_BACKEND_API_DECK;
  try {
    const response = await Axios.get(URL);
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
  const URL = import.meta.env.VITE_BACKEND_API_DECK;
  try {
    const response = await Axios.get(URL + `/${deckID}`);
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
  const URL = import.meta.env.VITE_BACKEND_API_DECK;
  try {
    const response = await Axios.delete(URL + `/${deckID}`);
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
  const URL = `${import.meta.env.VITE_BACKEND_API_WORD}/create-word`;
  try {
    const response = await Axios.post(URL, word);
    return response.data;
  } catch (err: any) {
    console.error(NAMESPACE, err);
    throw new Error(err.response?.data?.error || "Failed to create word");
  }
};

const deleteWordByID = async (id: string) => {
  const URL = `${import.meta.env.VITE_BACKEND_API_WORD}/delete-word`;
  try {
    const response = await Axios.delete(URL + `/${id}`);
    console.log(response);
    return response.data;
  } catch (err: any) {
    console.error(NAMESPACE, err);
    throw new Error(err.response?.data?.error || "Failed to delete word");
  }
};

const VocabService = {
  createDeck,
  createWord,
  fetchDeckByID,
  fetchAllDecks,
  deleteDeckByID,
  deleteWordByID,
};

export { VocabService };
