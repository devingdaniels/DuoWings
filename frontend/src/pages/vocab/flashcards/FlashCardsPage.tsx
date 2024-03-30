import { useState } from "react";
import FlashCard from "./FlashCard";
import { useAppSelector } from "../../../app/hooks";
import { BiSkipNextCircle } from "react-icons/bi";
import { BiSkipPreviousCircle } from "react-icons/bi";
import { FaShuffle } from "react-icons/fa6";

const FlashCardsPage = () => {
  const { currentDeck } = useAppSelector((state) => state.vocab);
  const words = currentDeck?.words || [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const delay = (duration: number) => new Promise((resolve) => setTimeout(resolve, duration));

  const handleChangeCard = async (newIndex: number) => {
    if (isFlipped) {
      setIsFlipped(false); // Flip back to the word side
      await delay(200); // Wait for the flip animation to complete
    }
    setCurrentIndex(newIndex);
  };

  const handleNext = () => {
    const newIndex = currentIndex < words.length - 1 ? currentIndex + 1 : 0;
    handleChangeCard(newIndex);
  };

  const handlePrev = () => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : words.length - 1;
    handleChangeCard(newIndex);
  };

  const handleShuffle = async (e: React.MouseEvent) => {
    e.stopPropagation();
    alert("Shuffle");
  };

  return (
    <div className="flashcards-page-container">
      {words.length > 0 && currentDeck ? (
        <>
          <FlashCard
            deck={currentDeck}
            word={words[currentIndex]}
            isFlipped={isFlipped}
            setIsFlipped={setIsFlipped}
          />
          <div>{currentIndex + 1 + "/" + words.length}</div>
          <div className="navigation-container">
            <BiSkipPreviousCircle className="navigation-button" onClick={handlePrev} size={45} />
            <BiSkipNextCircle className="navigation-button" onClick={handleNext} size={45} />
          </div>
          <div>
            <FaShuffle size={35} onClick={handleShuffle} />
          </div>
        </>
      ) : (
        <div>No words found or deck is not selected.</div> // This is a simple fallback, customize as needed
      )}
    </div>
  );
};

export default FlashCardsPage;
