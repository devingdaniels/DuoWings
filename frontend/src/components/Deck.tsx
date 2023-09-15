import React from "react";

type WordEntry = {
  word: string;
  englishDefinition: string;
  exampleSentence: string;
  wordType: string;
  conjugation: string;
  correctCount: number[];
  incorrectCount: number[];
  lastCorrectDate: Date | null;
  lastIncorrectDate: Date | null;
};

type DeckProps = {
  deck: {
    id: number;
    name: string;
    description: string;
    tags: string[];
    words: WordEntry[];
    laststudy: Date | null;
  };
};

const Deck: React.FC<DeckProps> = ({ deck }) => {
  // Calculate the total word count
  const totalWordCount = deck.words.length;

  return (
    <>
      <div className="deck-container" key={deck.id}>
        <h6>{deck.name}</h6>
        <h6>{deck.description}</h6>
        <h6>Tags: {deck.tags.join(", ")}</h6>
        <h6>Total Word Count: {totalWordCount}</h6>
        <h6>
          Studied Last:{" "}
          {deck.laststudy ? deck.laststudy.toLocaleDateString() : "null"}
        </h6>
      </div>
    </>
  );
};

export default Deck;
