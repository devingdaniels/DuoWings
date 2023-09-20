import axios from "axios";

const fetchAllDecks = async () => {
  try {
    const URL = import.meta.env.VITE_BACKEND_API_DECK;
    const response = await axios.get(URL);
    return response.data;
  } catch (err: any) {
    if (err.response && err.response.data) {
      throw new Error(err.response.data.message);
    } else {
      throw new Error("Error: Failed to fetch decks");
    }
  }
};

const deckService = {
  fetchAllDecks,
};

export default deckService;
