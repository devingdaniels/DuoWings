import React from "react";
import { IWord, IConjugation, IWordDeck } from "../../../interfaces";
import { FaShuffle } from "react-icons/fa6";
import { MdFavorite } from "react-icons/md";
import { MdFavoriteBorder } from "react-icons/md";

interface FlashCardProps {
  deck: IWordDeck;
  word: IWord;
  length: number;
  index: number;
  isFlipped: boolean;
  setIsFlipped: (flipped: boolean) => void;
}

const FlashCard: React.FC<FlashCardProps> = ({
  deck,
  index,
  length,
  word,
  isFlipped,
  setIsFlipped,
}) => {
  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  // const renderConjugation = (conjugation: IConjugation, tense: string) => {
  //   return (
  //     <div key={tense}>
  //       <strong>{tense.charAt(0).toUpperCase() + tense.slice(1)}:</strong>
  //       <p>
  //         {conjugation.yo && <p>Yo: {conjugation.yo}</p>}
  //         {conjugation.tu && <li>Tú: {conjugation.tu}</li>}
  //         {conjugation.el && <li>Él/Ella: {conjugation.el}</li>}
  //         {conjugation.nosotros && <li>Nosotros: {conjugation.nosotros}</li>}
  //         {conjugation.vosotros && <li>Vosotros: {conjugation.vosotros}</li>}
  //         {conjugation.ellos && <li>Ellos/Ellas: {conjugation.ellos}</li>}
  //       </p>
  //     </div>
  //   );
  // };

  // const renderConjugations = (conjugations: {
  //   present?: IConjugation;
  //   preterite?: IConjugation;
  //   future?: IConjugation;
  //   imperfect?: IConjugation;
  // }) => {
  //   return Object.entries(conjugations).map(([tense, conjugation]) =>
  //     conjugation ? renderConjugation(conjugation, tense) : null
  //   );
  // };

  function handleToggleFavorite(e: React.MouseEvent) {
    e.stopPropagation();
    console.log("Toggle favorite");
  }

  function handleShuffle(e: React.MouseEvent) {
    e.stopPropagation();
    console.log("handle shuffle");
  }

  return (
    <div className="flashcard-page-container">
      <h1>{deck.name}</h1>
      {index}/{length}
      <FaShuffle onClick={handleShuffle} />
      <div className="flashcard-container" onClick={handleClick}>
        <div className={`flashcard ${isFlipped ? "flipped" : ""}`}>
          <div className="front">
            <p onClick={handleToggleFavorite}>
              {word.isFavorite ? <MdFavorite /> : <MdFavoriteBorder />}
            </p>
            <strong>{word.word}</strong>
            <br />
            <i>{word.phoneticSpelling}</i>
          </div>
          <div className="back">
            <p>
              <strong>Definition:</strong> {word.definition}
            </p>
            <p>
              <strong>Example:</strong> {word.exampleSentence}
            </p>
            <p>
              <strong>Phonetic:</strong> {word.phoneticSpelling}
            </p>
            <p>
              <strong>Type:</strong> {word.wordType}
            </p>
            {/* {word.conjugations && renderConjugations(word.conjugations)} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlashCard;
