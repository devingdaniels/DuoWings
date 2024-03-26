import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import { VocabSliceService } from "../../../features/vocabSlice";
import CreateWordForm from "../words/CreateWordForm";
import { ICreateNewVocabWord } from "../../../interfaces/index";
import { useNavigate } from "react-router-dom";
import DeckPageTable from "./DeckPageWordsTable";
import RingLoader from "react-spinners/RingLoader";
import { FcPositiveDynamic } from "react-icons/fc";
import { FcUpload } from "react-icons/fc";
import { toast } from "react-toastify";

const DeckPage = () => {
  // Hooks
  const navigate = useNavigate();

  // Redux
  const dispatch = useAppDispatch();

  // Current deck from redux store
  const { currentDeck, isLoading } = useAppSelector((state) => state.vocab);

  const handleCreateNewWord = async (word: ICreateNewVocabWord) => {
    const response = await dispatch(VocabSliceService.createWord(word));
    if (response.type === "vocab/createWord/fulfilled") {
      toast.success("Word created!");
      dispatch(VocabSliceService.resetDeckStatusFlagsToDefault());
    } else {
      toast.error(response.payload);
      dispatch(VocabSliceService.resetErrorState());
    }
  };

  return (
    <div className="deck-page-container">
      {currentDeck ? (
        <>
          <div className="deck-page-deck-header">
            <h1>{currentDeck.name}</h1>
            <p>{currentDeck.description}</p>
          </div>

          <div className="deck-page-loading-create-word-form-container">
            {isLoading ? (
              <RingLoader
                className="create-word-loading-spinner-container"
                size={60}
                color="rgba(245, 58, 58 , 0.66)"
              />
            ) : (
              <CreateWordForm handleCreateNewWord={handleCreateNewWord} deckID={currentDeck._id} />
            )}
          </div>

          <div className="deck-button-options-panel">
            <div
              className="deck-page-action-button"
              onClick={() => navigate("/vocab/decks/upload-words")}
            >
              <FcUpload size={35} />
              Upload
            </div>
            <div
              className="deck-page-action-button"
              onClick={() => navigate("/vocab/decks/flashcards")}
            >
              <FcPositiveDynamic size={35} />
              Flashcards
            </div>
          </div>

          <DeckPageTable words={currentDeck.words} />
        </>
      ) : (
        <p>Application error, please navigate to "decks" resolve...</p>
      )}
    </div>
  );
};

export default DeckPage;
