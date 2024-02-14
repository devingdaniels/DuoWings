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
  const { currentDeck, isLoading } = useAppSelector((state) => state.vocab);

  const handleCreateNewWord = async (word: ICreateNewVocabWord) => {
    const response = await dispatch(VocabSliceService.createWord(word));
    if (response.type === "vocab/createWord/fulfilled") {
      toast.success("Word created successfully!");
      dispatch(VocabSliceService.resetDeckStateFlags());
    } else {
      toast.error(response.payload);
      dispatch(VocabSliceService.resetErrorState());
    }
  };

  if (isLoading || !currentDeck)
    return (
      <div className="deck-page-container">
        <RingLoader size={53} color="rgba(59, 172, 57, 0.66)" />
      </div>
    );

  return (
    <div className="deck-page-container">
      <div className="deck-page-deck-header">
        <h1>{currentDeck.name}</h1>
        <p>{currentDeck.description}</p>
      </div>
      <CreateWordForm handleCreateNewWord={handleCreateNewWord} deckID={currentDeck._id} />
      <Button onClick={() => navigate("/vocab/decks/upload-words")}>Upload words</Button>
      <FaPlay onClick={() => navigate("/vocab/decks/flashcards")} />
      <DeckPageTable words={currentDeck.words} />
    </div>
  );
};

export default DeckPage;
