import { useState } from "react";
import FlashCard from "./FlashCard";
import { useAppSelector } from "../../../app/hooks";

const FlashCardsPage = () => {
  const { currentDeck } = useAppSelector((state) => state.vocab);
  const words = currentDeck?.words || [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const delay = (duration: number) => new Promise((resolve) => setTimeout(resolve, duration));

  const handleChangeCard = async (newIndex: number) => {
    if (isFlipped) {
      setIsFlipped(false); // Flip back to the word side
      await delay(800); // Wait for the flip animation to complete
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

  return (
    <div className="flashcards-container">
      {words.length > 0 && (
        <FlashCard
          length={words.length}
          index={currentIndex + 1}
          word={words[currentIndex]}
          isFlipped={isFlipped}
          setIsFlipped={setIsFlipped}
        />
      )}
      <div className="navigation">
        <button onClick={handlePrev}>&lt; Prev</button>
        <button onClick={handleNext}>Next &gt;</button>
      </div>
    </div>
  );
};

export default FlashCardsPage;
