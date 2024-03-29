import React from "react";
import { IWord } from "../../../interfaces";
import { FaShuffle } from "react-icons/fa6";

interface FlashCardProps {
  word: IWord;
  length: number;
  index: number;
  isFlipped: boolean;
  setIsFlipped: (flipped: boolean) => void;
}

const FlashCard: React.FC<FlashCardProps> = ({ index, length, word, isFlipped, setIsFlipped }) => {
  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="flashcard-page-container">
      <div className="flashcard-container" onClick={handleClick}>
        <div className={`flashcard ${isFlipped ? "flipped" : ""}`}>
          <div className="front">{word.word}</div>
          <div className="back">
            <p>{word.definition}</p>
            <p>{word.exampleSentence}</p>
            <p>{word.phoneticSpelling}</p>
          </div>
        </div>
      </div>
      {index}/{length}
      <FaShuffle />
    </div>
  );
};

export default FlashCard;
