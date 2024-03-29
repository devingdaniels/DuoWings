import { IWordDeck } from "../../../interfaces/index";
import { useNavigate } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
import { useAppDispatch } from "../../../app/hooks";
import { VocabSliceService } from "../../../features/vocabSlice";
import { toast } from "react-toastify";

interface DeckProps {
  deck: IWordDeck;
}

const DeckCardOverview: React.FC<DeckProps> = ({ deck }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleDeleteDeck = async (e: React.MouseEvent<HTMLButtonElement>) => {
    // Delete button is inside deck card which also has onClick
    // stopPropagation prevents the onClick from firing that would result in going to that deck's page under the delete button
    e.stopPropagation();
    toast.info(`Deleting ${deck.name}...`);
    const response = await dispatch(VocabSliceService.deleteDeckByID(deck._id));
    if (response.type === "vocab/deleteDeckByID/fulfilled") {
      dispatch(VocabSliceService.resetDeckStatusFlagsToDefault());
      await dispatch(VocabSliceService.fetchAllDecks());
      toast.success(`Deleted ${deck.name}`);
    } else {
      toast.error(response.payload);
      dispatch(VocabSliceService.resetErrorState());
    }
  };

  const goToDeckPage = (deck: IWordDeck) => {
    dispatch(VocabSliceService.setCurrentDeck(deck));
    navigate(`/vocab/decks/${deck._id}`);
  };

  return (
    <div className="deck-card-overview-container" onClick={() => goToDeckPage(deck)}>
      <div className="deck-card-overview-header">
        <span className="deck-header-item deck-header-level-container">lvl. {deck.level}</span>
        <h2 className="deck-header-item">{deck.name}</h2>
        <div className="deck-header-item deck-card-overview-delete-icon">
          <AiOutlineDelete onClick={handleDeleteDeck} size={30} />
        </div>
      </div>
      <div className="deck-details">
        <div>
          <p>Created: {new Date(deck.creationDate).toLocaleDateString()}</p>
          <p>Words: {deck.words.length}</p>
        </div>
      </div>
    </div>
  );
};

export default DeckCardOverview;
