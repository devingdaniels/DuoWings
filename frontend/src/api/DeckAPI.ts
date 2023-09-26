import axios from "axios";
import { INewVocabDeck } from "../interfaces/index";

const createNewDeck = async (deck: INewVocabDeck) => {
  try {
    const URL = import.meta.env.VITE_BACKEND_API_DECK + "/create-deck";
    const response = await axios.post(URL, deck);
    return response.data;
  } catch (error) {
    // TODO: Handle error
    console.log("Error creating new deck", error);
  }
};

const deleteDeckByID = async (deckID: string | undefined) => {
  const URL = import.meta.env.VITE_BACKEND_API_DECK + `/${deckID}`;
  try {
    const response = await axios.delete(URL);
    const deck = await response.data;
    console.log(deck);
  } catch (error) {
    // TODO: Handle error
    console.log("Error deleting deck by ID", error);
  }
};

const deckAPI = {
  createNewDeck,
  deleteDeckByID,
};

export { deckAPI };
