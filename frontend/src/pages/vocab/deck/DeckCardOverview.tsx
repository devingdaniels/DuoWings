import { IWordDeck } from "../../../interfaces/index";
import { useNavigate } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
import { useAppDispatch } from "../../../app/hooks";
import { VocabSliceService } from "../../../features/vocabSlice";
import { toast } from "react-toastify";

interface DeckProps {
  deck: IWordDeck;
  fetchUserDecks: () => void;
}

const DeckCardOverview: React.FC<DeckProps> = ({ deck, fetchUserDecks }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleDeleteDeck = async (e: React.MouseEvent<HTMLButtonElement>) => {
    // Delete button is inside deck card which also has onClick
    // stopPropagation prevents the onClick from firing that would result in going to that deck's page under the delete button
    e.stopPropagation();

    const response = await dispatch(VocabSliceService.deleteDeckByID(deck._id));
    if (response.type === "vocab/deleteDeckByID/fulfilled") {
      toast.success(`Deleted ${deck.name}`);
      dispatch(VocabSliceService.resetDeckStatusFlagsToDefault());
    } else {
      console.log("toast triggered from DeckCardOverviewPage.tsx");
      toast.error(response.payload);
      dispatch(VocabSliceService.resetErrorState());
    }
    fetchUserDecks();
  };

  const goToDeckPage = (deck: IWordDeck) => {
    dispatch(VocabSliceService.setCurrentDeck(deck));
    navigate(`/vocab/decks/${deck._id}`);
  };

  return (
    <div className="deck-card-overview-container" onClick={() => goToDeckPage(deck)}>
      <div className="deck-card-overview-header">
        <span className="deck-header-item deck-header-level-container">FIX ME{deck.level}</span>
        <h2 className="deck-header-item">{deck.name}</h2>
        <div className="deck-header-item delete-container">
          <AiOutlineDelete onClick={handleDeleteDeck} size={30} />
        </div>
      </div>
      <div className="deck-details">
        <p>Created: {new Date(deck.creationDate).toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default DeckCardOverview;
