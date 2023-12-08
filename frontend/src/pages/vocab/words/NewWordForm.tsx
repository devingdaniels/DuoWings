import React, { useState } from "react";

interface NewWordFormProps {
  handleCreateNewWord: (word: string) => void;
}

const NewWordForm: React.FC<NewWordFormProps> = ({ handleCreateNewWord }) => {
  const [word, setWord] = useState<string | "">("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const w = word.trim();
    setWord("");
    handleCreateNewWord(w);
  };

  handleCreateNewWord;

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="word">Word:</label>
      <input
        type="text"
        id="word"
        value={word}
        onChange={(e) => setWord(e.target.value)}
      />
      <button type="submit">Add Vocab</button>
    </form>
  );
};

export default NewWordForm;
