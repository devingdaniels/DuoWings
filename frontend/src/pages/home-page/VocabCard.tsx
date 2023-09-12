import { useState } from "react";
import "./VocabCard.css";

const spanishWords = [
  { word: "hola", definition: "hello" },
  { word: "adios", definition: "goodbye" },
];

const VocabCard = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNextClick = () => {
    const nextIndex = (currentIndex + 1) % spanishWords.length;
    setCurrentIndex(nextIndex);
    setIsFlipped(false);
  };

  const handlePrevClick = () => {
    const prevIndex =
      (currentIndex - 1 + spanishWords.length) % spanishWords.length;
    setCurrentIndex(prevIndex);
    setIsFlipped(false);
  };

  return (
    <div className="vocab-card-container">
      <div
        className={`vocab-card ${isFlipped ? "flipped" : ""}`}
        onClick={handleCardClick}
      >
        <div className="card">
          <div className={`face front ${isFlipped ? "hidden" : ""}`}>
            {spanishWords[currentIndex].word}
          </div>
          <div className={`face back ${isFlipped ? "" : "hidden"}`}>
            {spanishWords[currentIndex].definition}
          </div>
        </div>
      </div>
      <div className="navigation-buttons">
        <button onClick={handlePrevClick}>Previous</button>
        <button onClick={handleNextClick}>Next</button>
      </div>
    </div>
  );
};

export default VocabCard;
