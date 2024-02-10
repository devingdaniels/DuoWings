import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import { createWord } from "../../../features/vocabSlice";
import CreateWordForm from "../words/CreateWordForm";
import { ICreateNewVocabWord } from "../../../interfaces/index";
// import { VocabSliceService } from "../../../features/vocabSlice";
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
   //! This is returning null sometimes and causing a crash
  const [deck, setDeck] = useState<IWordDeck>(currentDeck!);

  // Side effects
  useEffect(() => {
    
  }, [dispatch, currentDeck, navigate]);

  // Componenet functions
  const handleCreateNewWord = async (word: ICreateNewVocabWord) => {
    word.deckID = deck._id
    const response = await dispatch(createWord(word));
    setDeck(response.payload);
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
