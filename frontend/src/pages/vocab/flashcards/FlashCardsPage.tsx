import { useEffect, useState, useMemo } from "react";
import FlashCard from "./FlashCard";
import { useAppSelector } from "../../../app/hooks";
import { BiSkipNextCircle } from "react-icons/bi";
import { BiSkipPreviousCircle } from "react-icons/bi";
import { FaShuffle } from "react-icons/fa6";
import { delay } from "../../../utils/UtilityFunctions";

const FlashCardsPage: React.FC = () => {
  const { currentDeck } = useAppSelector((state) => state.vocab);

  const words = useMemo(() => {
    return currentDeck?.words || [];
  }, [currentDeck?.words]);

  const [isShuffled, setIsShuffled] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [shuffledWords, setShuffledWords] = useState(words);

  const handleNext = () => {
    const newIndex = currentIndex < words.length - 1 ? currentIndex + 1 : 0;
    handleChangeCard(newIndex);
  };

  const handlePrev = () => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : words.length - 1;
    handleChangeCard(newIndex);
  };

  const handleChangeCard = async (newIndex: number) => {
    if (isFlipped) {
      setIsFlipped(false); // Flip back to the word side
      await delay(200); // Wait for the flip animation to complete
    }
    setCurrentIndex(newIndex);
  };

  const toggleShuffleButton = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsShuffled(!isShuffled);
  };

  useEffect(() => {
    if (isShuffled) {
      const shuffled = [...words].sort(() => 0.5 - Math.random()); //! Create better shuffle algorithm?
      setShuffledWords(shuffled);
    } else {
      setShuffledWords(words);
    }
  }, [isShuffled, words]);

  useEffect(() => {
    const flipSpace = (e: KeyboardEvent) => (e.code === "Space" ? setIsFlipped(!isFlipped) : null);
    const handleRightArrow = (e: KeyboardEvent) => (e.code === "ArrowRight" ? handleNext() : null);
    const leftArrow = (e: KeyboardEvent) => (e.code === "ArrowLeft" ? handlePrev() : null);
    const togShuf = (e: KeyboardEvent) => (e.code === "KeyS" ? setIsShuffled(!isShuffled) : null);

    document.addEventListener("keydown", flipSpace);
    document.addEventListener("keydown", handleRightArrow);
    document.addEventListener("keydown", leftArrow);
    document.addEventListener("keydown", togShuf);

    return () => {
      document.removeEventListener("keydown", flipSpace);
      document.removeEventListener("keydown", handleRightArrow);
      document.removeEventListener("keydown", leftArrow);
      document.removeEventListener("keydown", togShuf);
    };
  });

  return (
    <div className="flashcards-page-container">
      {words.length > 0 && currentDeck ? (
        <>
          <FlashCard
            deck={currentDeck}
            word={isShuffled ? shuffledWords[currentIndex] : words[currentIndex]}
            isFlipped={isFlipped}
            setIsFlipped={setIsFlipped}
          />
          <br />
          <div>
            <strong>{currentIndex + 1 + "/" + words.length}</strong>
          </div>
          <br />
          <div className="navigation-container">
            <span>
              <BiSkipPreviousCircle className="navigation-button" onClick={handlePrev} size={45} />
              <BiSkipNextCircle className="navigation-button" onClick={handleNext} size={45} />
            </span>
            <br />
            <FaShuffle
              className={`flashcard-shuffle-button ${isShuffled ? "shuffled" : ""}`}
              size={35}
              onClick={toggleShuffleButton}
            />
          </div>
        </>
      ) : (
        <div>No words found or deck is not selected.</div>
      )}
    </div>
  );
};

export default FlashCardsPage;
