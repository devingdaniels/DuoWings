import React from "react";
import { IWord, IWordDeck } from "../../../interfaces";
import { MdFavorite } from "react-icons/md";
import { MdFavoriteBorder } from "react-icons/md";
import { useAppDispatch } from "../../../app/hooks";
import { VocabSliceService } from "../../../features/vocabSlice";
import { toastService } from "../../../utils/Toastify";

interface FlashCardProps {
  deck: IWordDeck;
  word: IWord;
  isFlipped: boolean;
  setIsFlipped: (flipped: boolean) => void;
}

const FlashCard: React.FC<FlashCardProps> = ({ ...props }) => {
  // Component props
  const { deck, word, isFlipped, setIsFlipped } = props;
  // Redux
  const dispatch = useAppDispatch();

  const handleToggleFavorite = async (word: IWord, e: React.MouseEvent) => {
    // Prevent the click event from bubbling up to the parent div
    e.stopPropagation();

    const response = await dispatch(VocabSliceService.toggleIsFavoriteOnWord(word._id));

    if (response.type === "vocab/toggleIsFavoriteOnWord/fulfilled") {
      toastService.success("❤️'d");
      dispatch(VocabSliceService.resetDeckStatusFlagsToDefault());
    } else {
      toastService.error(response.payload);
      dispatch(VocabSliceService.resetErrorState());
    }
  };

  const FlashcardHeader = () => {
    return (
      <div onClick={(e) => handleToggleFavorite(word, e)} className="flashcard-header">
        <div className="deck-header-item deck-header-level-container">
          <span>lvl. {word.stats.level}</span>
          <h3></h3>
        </div>
        <div>
          {word.isFavorite ? (
            <MdFavorite size={30} className="heart-filled" />
          ) : (
            <MdFavoriteBorder size={30} className="heart-border" />
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="flashcard-page-container">
      <div className="flashcard-page-header">
        <h1>{deck.name}</h1>
      </div>
      <div className="flashcard-container" onClick={() => setIsFlipped(!isFlipped)}>
        <div className={`flashcard ${isFlipped ? "flipped" : ""}`}>
          <div className="front">
            <div className="front-word-container">
              <FlashcardHeader />
              <div className="front-word-and-phonetic">
                <h2>
                  <strong>{word.word}</strong>
                </h2>
                <br />
                <i>{word.phoneticSpelling}</i>
              </div>
            </div>
          </div>
          <div className="back">
            <div className="back-word-container">
              <FlashcardHeader />
              <div className="back-word-and-details">
                <h2>
                  <strong>{word.word}</strong>
                </h2>
                <br />
                <i>{word.phoneticSpelling}</i>
                <br />
                <p>{word.wordType}</p>
                <br />
                <p>{word.definition}</p>
                <br />
                <p>{word.exampleSentence}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlashCard;

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
