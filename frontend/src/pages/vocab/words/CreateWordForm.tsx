import React, { useState } from "react";
import { ICreateNewVocabWord } from "../../../interfaces/index";

interface NewWordFormProps {
  handleCreateNewWord: (formData: ICreateNewVocabWord) => void;
}

const NewWordForm: React.FC<NewWordFormProps> = ({ handleCreateNewWord }) => {
  const [formData, setFormData] = useState<ICreateNewVocabWord>({
    word: "",
    deckID: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Trim whitespace from word and definition
    formData.word = formData.word.trim();
    // Call parent component function, which will make API call to create new word
    handleCreateNewWord(formData);
    // Reset form
    setFormData({
      word: "",
      deckID: "",
    });
  };

  return (
    <form className="create-new-word" onSubmit={handleSubmit}>
      <input
        type="text"
        id="word"
        value={formData.word}
        required
        placeholder="Enter a new word"
        onChange={(e) =>
          setFormData({
            ...formData,
            word: e.target.value,
          })
        }
      />
      <button type="submit">Create</button>
    </form>
  );
};

export default NewWordForm;
