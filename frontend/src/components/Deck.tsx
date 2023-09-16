import React from "react";
import { IDeckProps } from "../interfaces";

const Deck: React.FC<IDeckProps> = ({ deck }) => {
  // Calculate the total word count
  // const totalWordCount = deck.words.length;

  return (
    <>
      <div className="deck-container" key={deck.id}>
        <h6>{deck.name}</h6>
        <h6>{deck.description}</h6>
        <h6>Tags: {deck.tags.join(", ")}</h6>
        {/* <h6>Total Word Count: {totalWordCount}</h6> */}
        <h6>
          Studied Last:{" "}
          {deck.laststudy ? deck.laststudy.toLocaleDateString() : "null"}
        </h6>
      </div>
    </>
  );
};

export default Deck;
