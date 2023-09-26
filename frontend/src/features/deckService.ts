import axios from "axios";

const fetchAllDecks = async () => {
  try {
    const URL = import.meta.env.VITE_BACKEND_API_DECK;
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

const fetchDeckByID = async (deckID: string | undefined) => {
  const URL = import.meta.env.VITE_BACKEND_API_DECK + `/${deckID}`;
  try {
    const response = await axios.get(URL);
    const deck = await response.data;
    return deck;
  } catch (err: any) {
    if (err.response && err.response.data) {
      console.error(err.response.data.message);
      throw new Error(err.response.data.message);
    } else {
      console.error("Error:", err);
      throw new Error(`Error: Failed to fetch deck with ID ${deckID}`);
    }
  }
};

const deckService = {
  fetchAllDecks,
  fetchDeckByID,
};

export default deckService;
