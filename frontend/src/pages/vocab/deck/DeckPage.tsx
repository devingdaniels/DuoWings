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
import RingLoader from "react-spinners/RingLoader";
import { IWordDeck } from "../../../interfaces";

const DeckPage = () => {
  // Hooks
  const navigate = useNavigate();

  // Redux
  const dispatch = useAppDispatch();
  const { currentDeck, isLoading, isError, message } = useAppSelector((state) => state.vocab);

  // Component state
  const [deck, setDeck] = useState<IWordDeck>(currentDeck!); //! Problematic since we have to !

  // Side effects
  useEffect(() => {
    dispatch(VocabSliceService.resetDeckStatus());
    // return () => {
    //   dispatch(VocabSliceService.resetCurrentDeck());
    // };
  }, [dispatch]);

  // Componenet functions
  const handleCreateNewWord = async (word: ICreateNewVocabWord) => {
    //! This can be undefined which is causing an issue on the frotend after creating a new word and then trying to create another one
    word.deckID = currentDeck!._id;
    const response = await dispatch(createWord(word));
    setDeck(response.payload);
    //! Without this, the deck page will not update with the new word, but this is not ideal
    dispatch(VocabSliceService.fetchAllUserDecks());
  };

  if (isError) return <p>Error: {message}</p>;

  if (isLoading)
    return (
      <div className="deck-page-container">
        <RingLoader size={53} color="rgba(59, 172, 57, 0.66)" />
      </div>
    );

  return (
    <div className="deck-page-container">
      {deck && !isLoading && (
        <>
          {/* <div className="return-to-decks-icon"><IoMdReturnLeft /></div> */}
          <div className="deck-page-deck-header">
            <h1>{deck.name}</h1>
            <p>{deck.description}</p>
          </div>
          <CreateWordForm handleCreateNewWord={handleCreateNewWord} />
          <Button onClick={() => navigate("/vocab/decks/upload-words")}>Upload words</Button>
          <DeckPageTable words={deck.words} />
        </>
      )}
    </div>
  );
};

export default DeckPage;
