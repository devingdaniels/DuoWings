import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { deckAPI } from "../../api/DeckAPI";

const DeckCardDetails = () => {
  const { deckId } = useParams();

  useEffect(() => {
    deckAPI.fetchDeckByID(deckId);
  }, []);

  return <div className="deck-card-details-page-container">Deck ID: {deckId}</div>;
};

export default DeckCardDetails;
