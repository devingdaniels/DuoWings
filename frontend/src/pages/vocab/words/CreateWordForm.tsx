import React, { useState } from "react";
import { ICreateNewVocabWord } from "../../../interfaces/index";
import { Button } from "@mui/material";

interface CreateWordForm {
  handleCreateNewWord: (formData: ICreateNewVocabWord) => void;
  deckID: string;
}

const CreateWordForm: React.FC<CreateWordForm> = ({ handleCreateNewWord, deckID }) => {
  const [formData, setFormData] = useState<ICreateNewVocabWord>({
    word: "",
    deckID: deckID,
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // Prevent default form submission
    e.preventDefault();
    // Trim whitespace from word and definition
    formData.word = formData.word.trim();
    // Capitalize the first letter of the word
    formData.word = formData.word.charAt(0).toUpperCase() + formData.word.slice(1).toLowerCase();
    // Call the parent function
    handleCreateNewWord(formData);
    // Reset the state
    setFormData({
      word: "",
      deckID: "",
    });
  };

  return (
    <form className="create-new-word-container" onSubmit={handleSubmit}>
      <input
        type="text"
        id="word"
        value={formData.word}
        required
        placeholder="Enter a new word..."
        onChange={(e) =>
          setFormData({
            ...formData,
            word: e.target.value,
          })
        }
      />
      <Button className="create-new-word-button" type="submit">
        Create
      </Button>
    </form>
  );
};

export default CreateWordForm;
