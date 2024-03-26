import React, { useState } from "react";

interface FlashCardProps {
  word: string;
  definition: string;
}

const FlashCard: React.FC<FlashCardProps> = ({ word, definition }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="flashcard" onClick={handleClick}>
      <div className={`card ${isFlipped ? "flipped" : ""}`}>
        <div className="front">{word}</div>
        <div className="back">{definition}</div>
      </div>
    </div>
  );
};

export default FlashCard;
