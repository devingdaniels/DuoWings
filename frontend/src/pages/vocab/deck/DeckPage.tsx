import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import { createWord } from "../../../features/vocabSlice";
import CreateWordForm from "../words/CreateWordForm";
import { ICreateNewVocabWord } from "../../../interfaces/index";
import { VocabSliceService } from "../../../features/vocabSlice";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import DeckPageTable from "./DeckPageWordsTable";
import { useState } from "react";
import { SpinnerDotted } from "spinners-react";
import { IWordDeck } from "../../../interfaces";

const DeckPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { currentDeck, isLoading, isError, message } = useAppSelector((state) => state.vocab);

  const [deck, setDeck] = useState<IWordDeck>(currentDeck);

  const handleCreateNewWord = async (word: ICreateNewVocabWord) => {
    word.deckID = currentDeck!._id;
    const response = await dispatch(createWord(word));
    setDeck(response.payload);
    //! This is a hacky way to update the deck page
    dispatch(VocabSliceService.fetchAllUserDecks());
  };

  useEffect(() => {
    dispatch(VocabSliceService.resetDeckStatus());
  }, [dispatch]);

  if (isLoading)
    return (
      <div className="deck-page-container">
        <SpinnerDotted size={53} thickness={92} speed={69} color="rgba(59, 172, 57, 0.66)" />
      </div>
    );

  if (isError) return <p>Error: There was an error in the application -- {message}</p>;

  return (
    <div className="deck-page-container">
      {deck && !isLoading && (
        <div>
          <h1>{deck.name}</h1>
          <p>ID: {deck._id}</p>
          <CreateWordForm handleCreateNewWord={handleCreateNewWord} />
          <Button onClick={() => navigate("/vocab/upload-words")}>Upload words</Button>
          <DeckPageTable words={deck.words} />
        </div>
      )}
    </div>
  );
};

export default DeckPage;
