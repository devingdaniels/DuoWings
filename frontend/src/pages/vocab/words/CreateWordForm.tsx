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
      <input
        type="text"
        id="word"
        value={word}
        required
        placeholder="Enter a new word"
        onChange={(e) => setWord(e.target.value)}
      />
      <button type="submit">Create</button>
    </form>
  );
};

export default NewWordForm;
