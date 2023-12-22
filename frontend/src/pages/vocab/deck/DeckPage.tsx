import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import { createWord } from "../../../features/vocabSlice";
import CreateWordForm from "../words/CreateWordForm";
import { ICreateNewVocabWord } from "../../../interfaces/index";
import { VocabSliceService } from "../../../features/vocabSlice";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import DeckPageTable from "./DeckPageTable";
import { SpinnerDotted } from "spinners-react";

const DeckPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const currentDeck = useAppSelector(VocabSliceService.getCurrentDeck);
  const { isLoading, isError, message } = useAppSelector(
    (state) => state.vocab
  );

  const handleCreateNewWord = async (word: ICreateNewVocabWord) => {
    word.deckID = currentDeck!._id;
    const response = await dispatch(createWord(word));
    console.log(response);
    // do stuff
  };

  useEffect(() => {
    dispatch(VocabSliceService.resetDeckStatus());
  }, [dispatch]);

  if (isLoading)
    return (
      <SpinnerDotted
        size={53}
        thickness={92}
        speed={69}
        color="rgba(59, 172, 57, 0.66)"
      />
    );

  if (isError)
    return <p>Error: There was an error in the application -- {message}</p>;

  return (
    <div className="deck-page-container">
      {currentDeck && !isLoading && (
        <div>
          <h1>{currentDeck.name}</h1>
          <p>ID: {currentDeck._id}</p>
          <CreateWordForm handleCreateNewWord={handleCreateNewWord} />
          <Button onClick={() => navigate("/vocab/upload-words")}>
            Upload words
          </Button>
          <DeckPageTable deck={currentDeck.words} />
        </div>
      )}
    </div>
  );
};

export default DeckPage;
