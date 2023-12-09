import { IWordDeck } from "../../../interfaces/index";
import { useNavigate } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
import { useAppDispatch } from "../../../app/hooks";
import { deleteDeckByID, setCurrentDeck } from "../../../features/vocabSlice";

interface DeckProps {
  deck: IWordDeck;
  fetchUserDecks: () => void;
}

const DeckCardOverview: React.FC<DeckProps> = ({ deck, fetchUserDecks }) => {
  // Hooks
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  // Handlers
  const goToDeckPage = (deck: IWordDeck) => {
    dispatch(setCurrentDeck(deck));
    navigate(`/vocab/decks/${deck._id}`);
  };

  const handleDeleteDeck = async (e: React.MouseEvent<HTMLButtonElement>) => {
    // Delete button is inside deck card which also has onClick
    // stopPropagation prevents the onClick from firing that would result in going to that deck's page
    e.stopPropagation();
    await dispatch(deleteDeckByID(deck._id));
    fetchUserDecks();
  };

  return (
    <div
      className="deck-card-overview-container"
      onClick={() => goToDeckPage(deck)}
    >
      <div className="deck-card-overview-header">
        <span className="deck-header-item deck-header-level-container">
          Level {deck.level}
        </span>
        <h2 className="deck-header-item">{deck.name}</h2>
        <div className="deck-header-item delete-container">
          <AiOutlineDelete onClick={handleDeleteDeck} size={30} />
        </div>
      </div>
      <div className="deck-details">
        <p>{deck.description}</p>
        <p>Created: {new Date(deck.creationDate).toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default DeckCardOverview;
