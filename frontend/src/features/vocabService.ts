import Axios from "axios";
import { ICreateNewDeck, ICreateNewVocabWord, IWord } from "../interfaces/index";

//! Axios configuration for cookies (this should be done in a separate file via Axios.create() and interceptor and then imported)
Axios.defaults.withCredentials = true;

const NAMESPACE = "vocabService.ts";

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
    console.error(NAMESPACE, err);
    console.log(err);
    throw new Error(
      err.response?.data?.message || `Error: Failed to delete deck with ID: ${deckID}`
    );
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
    return response.data;
  } catch (err: any) {
    console.error(NAMESPACE, err);
    throw new Error(err.response?.data?.error || "Failed to delete word");
  }
};

const updateWordInDeckByID = async (word: IWord) => {
  const URL = `${import.meta.env.VITE_BACKEND_API_WORD}/update-word`;
  try {
    const response = await Axios.put(URL + `/${word._id}`, word);
    return response.data;
  } catch (err: any) {
    console.error(NAMESPACE, err);
    throw new Error(err.response?.data?.error || "Failed to update word");
  }
};

const toggleIsFavoriteOnWord = async (id: string) => {
  const URL = `${import.meta.env.VITE_BACKEND_API_WORD}/toggle-favorite`;
  try {
    const response = await Axios.put(URL + `/${id}`);
    return response.data;
  } catch (err: any) {
    console.error(NAMESPACE, err);
    throw new Error(err.response?.data?.error || "Failed update isFavorite on word");
  }
};

const VocabService = {
  createDeck,
  createWord,
  fetchDeckByID,
  fetchAllDecks,
  deleteDeckByID,
  deleteWordByID,
  updateWordInDeckByID,
  toggleIsFavoriteOnWord,
};

export { VocabService };
