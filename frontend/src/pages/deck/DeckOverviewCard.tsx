import { useState } from "react"; // Import useState
import { IWordDeck } from "../../interfaces/index";
import { useNavigate } from "react-router-dom";
import { SlOptionsVertical } from "react-icons/sl";

const Deck = ({ deck }: { deck: IWordDeck }) => {
  // Hooks
  const navigate = useNavigate();
  const [isOptionsOpen, setIsOptionsOpen] = useState(false); // State variable to control submenu visibility

  const handleDeckClick = (deck: IWordDeck) => {
    navigate(`/vocab/decks/${deck._id}`);
  };

  const handleOptionsClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    // Toggle the state variable to show/hide the submenu
    setIsOptionsOpen((prev) => !prev);
  };

  return (
    <div className="deck-card">
      <div className="deck-header">
        <span className="deck-header-item deck-header-level-container">Level {deck.level}</span>
        <h4 className="deck-header-item" onClick={() => handleDeckClick(deck)}>
          {deck.name}
        </h4>
        <div className="deck-header-item options-container" onClick={handleOptionsClick}>
          <SlOptionsVertical />
          {isOptionsOpen && (
            <div className="submenu">
              <div className="submenu-option">Edit</div>
              <div className="submenu-option">Delete</div>
            </div>
          )}
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

export default Deck;
