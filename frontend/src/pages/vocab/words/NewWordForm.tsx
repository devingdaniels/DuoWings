import React, { useState } from "react";
import { useAppDispatch } from "../../../app/hooks";
import { createWord } from "../../../features/wordSlice";
import { INewVocabWord } from "../../../interfaces";

interface NewWordFormProps {
  deckID: string;
}

const NewWordForm: React.FC<NewWordFormProps> = ({ deckID }) => {
  const dispatch = useAppDispatch();
  const [word, setWord] = useState<INewVocabWord>({
    word: "",
    deckID: deckID,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(createWord(word));
    setWord({
      word: "",
      deckID: "",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="word">Word:</label>
      <input
        type="text"
        id="word"
        value={word?.word}
        onChange={(e) => setWord({ ...word, word: e.target.value })}
      />
      <button type="submit">Add Vocab</button>
    </form>
  );
};

export default NewWordForm;
