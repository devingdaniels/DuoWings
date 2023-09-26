import { IWordDeck } from "../../interfaces/index";
import { useNavigate } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";

import { useAppDispatch } from "../../app/hooks";
import { deleteDeckByID } from "../../features/deckSlice";

interface DeckProps {
  deck: IWordDeck;
  fetchUserDecks: () => void;
}

const DeckCardOverview: React.FC<DeckProps> = ({ deck, fetchUserDecks }) => {
  // Hooks
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  // Handlers
  const handleDeckClick = (deck: IWordDeck) => {
    navigate(`/vocab/decks/${deck._id}`);
  };
  const handleDeleteDeck = async () => {
    await dispatch(deleteDeckByID(deck._id));
    fetchUserDecks();
  };

  return (
    <div className="deck-card">
      <div className="deck-header">
        <span className="deck-header-item deck-header-level-container">Level {deck.level}</span>
        <h4 className="deck-header-item" onClick={() => handleDeckClick(deck)}>
          {deck.name}
        </h4>
        <div className="deck-header-item edit-delete-container">
          <AiOutlineDelete onClick={handleDeleteDeck} size={30} />
        </div>
      </div>
      <div className="deck-details">
        <p>Description: {deck.description}</p>
        <p>Tags: {deck.tags?.join(", ")}</p>
        <p>Created: {new Date(deck.creationDate).toLocaleDateString()}</p>
        <p>Last Studied: {new Date(deck.lastStudied).toLocaleDateString()}</p>
        <p>Experience Points: {deck.experiencePoints}</p>
        <p>Streak: {deck.streak}</p>
      </div>
    </div>
  );
};

export default DeckCardOverview;
