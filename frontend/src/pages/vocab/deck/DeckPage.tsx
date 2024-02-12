import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import { VocabSliceService } from "../../../features/vocabSlice";
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
    const response = await dispatch(VocabSliceService.createWord(word));
    // Update the local state
    setDeck(response.payload.responseDeck);
  };

  if (isError) return <p>Error: {message}</p>;

  if (isLoading)
    return (
      <div className="deck-page-container">
        <div className="deck-page-deck-header">
          <h1>{deck.name}</h1>
          <p>{deck.description}</p>
        </div>
        <RingLoader size={53} color="rgba(59, 172, 57, 0.66)" />
        <Button onClick={() => navigate("/vocab/decks/upload-words")}>Upload words</Button>
        <FaPlay onClick={() => navigate("/vocab/decks/flashcards")} />
        <DeckPageTable words={deck.words} />
      </div>
    );

  return (
    <div className="deck-page-container">
      {deck && !isLoading && currentDeck && (
        <>
          {/* <div className="return-to-decks-icon"><IoMdReturnLeft /></div> */}
          <div className="deck-page-deck-header">
            <h1>{deck.name}</h1>
            <p>{deck.description}</p>
          </div>
          <CreateWordForm handleCreateNewWord={handleCreateNewWord} deckID={currentDeck._id} />
          <Button onClick={() => navigate("/vocab/decks/upload-words")}>Upload words</Button>
          <FaPlay onClick={() => navigate("/vocab/decks/flashcards")} />
          <DeckPageTable words={currentDeck.words} />
        </>
      )}
    </div>
  );
};

export default DeckPage;
