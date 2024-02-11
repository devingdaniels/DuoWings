import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import { VocabSliceService, createWord } from "../../../features/vocabSlice";
import CreateWordForm from "../words/CreateWordForm";
import { ICreateNewVocabWord } from "../../../interfaces/index";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import DeckPageTable from "./DeckPageWordsTable";
import { useState } from "react";
import RingLoader from "react-spinners/RingLoader";
import { IWordDeck } from "../../../interfaces";
import { FaPlay } from "react-icons/fa";

const DeckPage = () => {
  // Hooks
  const navigate = useNavigate();
  // Redux
  const dispatch = useAppDispatch();
  const { currentDeck, isLoading, isError, message } = useAppSelector((state) => state.vocab);

  // Component state
  const [deck, setDeck] = useState<IWordDeck>(currentDeck!);

  // Component functions
  const handleCreateNewWord = async (word: ICreateNewVocabWord) => {
    word.deckID = deck._id;
    const response = await dispatch(createWord(word));
    // Reset the current deck in the store
    dispatch(VocabSliceService.setCurrentDeck(response.payload));
    // Update the local state
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
          <FaPlay onClick={() => navigate("/vocab/decks/flashcards")} />
          <DeckPageTable words={deck.words} />
        </>
      )}
    </div>
  );
};

export default DeckPage;
