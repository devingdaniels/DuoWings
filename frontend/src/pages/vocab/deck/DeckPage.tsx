import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import { VocabSliceService } from "../../../features/vocabSlice";
import CreateWordForm from "../words/CreateWordForm";
import { ICreateNewVocabWord } from "../../../interfaces/index";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import DeckPageTable from "./DeckPageWordsTable";
import RingLoader from "react-spinners/RingLoader";
import { FaPlay } from "react-icons/fa";
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
      toast.success("Word created successfully!");
      dispatch(VocabSliceService.resetDeckStatusFlagsToDefault());
    } else {
      console.log("toast triggered from DeckPage.tsx");
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
          <div style={{ minHeight: "100px", display: "flex", alignContent: "center" }}>
            {isLoading ? (
              <RingLoader size={53} color="rgba(59, 172, 57, 0.66)" />
            ) : (
              <CreateWordForm handleCreateNewWord={handleCreateNewWord} deckID={currentDeck._id} />
            )}
          </div>
          <Button onClick={() => navigate("/vocab/decks/upload-words")}>Upload words</Button>
          <FaPlay onClick={() => navigate("/vocab/decks/flashcards")} />
          <DeckPageTable words={currentDeck.words} />
        </>
      ) : (
        <p>Deck not found, please return home to resolve...</p>
      )}
    </div>
  );
};

export default DeckPage;
