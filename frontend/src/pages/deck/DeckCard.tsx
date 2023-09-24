import { IWordDeck } from "../../interfaces/index";
import { useNavigate } from "react-router-dom";

const Deck = ({ deck }: { deck: IWordDeck }) => {
  // Hooks
  const navigate = useNavigate();
  const handleDeckClick = (deck: IWordDeck) => {
    navigate(`/decks/${deck._id}`);
  };

  return (
    <div className="deck-card" onClick={() => handleDeckClick(deck)}>
      <div className="deck-header">
        <h4>{deck.name}</h4>
        <span className="level">Level {deck.level}</span>
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

export default Deck;
