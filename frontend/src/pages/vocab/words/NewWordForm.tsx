import React, { useState } from "react";
import { useAppDispatch } from "../../../app/hooks";
import { createWord } from "../../../features/wordSlice";
import { INewVocabWord } from "../../../interfaces";

interface NewWordFormProps {
  deckID: string;
}

const NewWordForm: React.FC<NewWordFormProps> = ({ deckID }) => {
  const fakeWord: INewVocabWord = {
    word: "fakeWord",
    englishDefinition: "fakeDefinition",
    exampleSentence: "fakeSentence",
    wordType: "fakeType",
    conjugation: "fakeConjugation",
    correctCount: [1, 2, 3],
    incorrectCount: [1, 2, 3],
    lastCorrectDate: new Date(),
    lastIncorrectDate: new Date(),
    deckID: deckID,
  };

  const [word, setWord] = useState("");
  const [definition, setDefinition] = useState("");
  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(createWord(fakeWord));
    setWord("");
    setDefinition("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="word">Word:</label>
      <input
        type="text"
        id="word"
        value={word}
        onChange={(e) => setWord(e.target.value)}
      />
      <label htmlFor="definition">Definition:</label>
      <textarea
        id="definition"
        value={definition}
        onChange={(e) => setDefinition(e.target.value)}
      />
      <button type="submit">Add Vocab</button>
    </form>
  );
};

export default NewWordForm;
