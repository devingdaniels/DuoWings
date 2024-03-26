import React from "react";
import { IWord } from "../../../interfaces";

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
    <div className="flashcard-container" onClick={handleClick}>
      <div className={`flashcard ${isFlipped ? "flipped" : ""}`}>
        <div className="front">{word.word}</div>
        <div className="back">{word.definition}</div>
      </div>
      {index}/{length}
    </div>
  );
};

export default FlashCard;
