import { useState } from "react"; // Import useState
import { IWordDeck } from "../../interfaces/index";
import { useNavigate } from "react-router-dom";
import { SlOptionsVertical } from "react-icons/sl";
import { AiOutlineEdit } from "react-icons/ai";
import { AiOutlineDelete } from "react-icons/ai";

interface DeckProps {
  deck: IWordDeck;
  updateDeckData: () => void;
}

const Deck: React.FC<DeckProps> = ({ deck, updateDeckData }) => {
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

  const handleDeleteDeck = () => {
    console.log("dispatch redux delete card...");
    updateDeckData();
  };

  return (
    <div className="deck-card">
      <div className="deck-header">
        <span className="deck-header-item deck-header-level-container">Level {deck.level}</span>
        <h4 className="deck-header-item" onClick={() => handleDeckClick(deck)}>
          {deck.name}
        </h4>
        <div className="deck-header-item options-container">
          {isOptionsOpen && (
            <div className="submenu">
              <AiOutlineEdit size={30} />
              <AiOutlineDelete onClick={handleDeleteDeck} size={30} />
            </div>
          )}
          <SlOptionsVertical onClick={handleOptionsClick} />
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
