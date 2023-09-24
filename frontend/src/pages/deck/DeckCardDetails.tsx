import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

const DeckCardDetails = () => {
  const { deckId } = useParams();

  const fetchDeckByID = async () => {
    const URL = import.meta.env.VITE_BACKEND_API_DECK + `/${deckId}`;
    try {
      const response = await axios.get(URL);
      const deck = await response.data;
      console.log(deck);
    } catch (error) {}
  };

  useEffect(() => {
    fetchDeckByID();
  }, []);

  return <div className="deck-card-details-page-container">Deck ID: {deckId}</div>;
};

export default DeckCardDetails;
