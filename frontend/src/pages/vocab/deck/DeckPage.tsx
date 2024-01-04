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
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { currentDeck, isLoading, isError, message } = useAppSelector((state) => state.vocab);

  const [deck, setDeck] = useState<IWordDeck>(currentDeck!); //! Problematic?

  const handleCreateNewWord = async (word: ICreateNewVocabWord) => {
    word.deckID = currentDeck!._id;
    const response = await dispatch(createWord(word));
    setDeck(response.payload);
    // This updates the deck in Redux store
    dispatch(VocabSliceService.fetchAllUserDecks());
  };

  useEffect(() => {
    dispatch(VocabSliceService.resetDeckStatus());
    // return () => {
    //   dispatch(VocabSliceService.resetCurrentDeck());
    // };
  }, [dispatch]);

  if (isError) return <p>Error: There was an error in the application -- {message}</p>;

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
