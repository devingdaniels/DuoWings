import React, { useState } from "react";
import { ICreateNewVocabWord } from "../../../interfaces/index";
import { Button } from "@mui/material";

interface NewWordFormProps {
  handleCreateNewWord: (formData: ICreateNewVocabWord) => void;
}

const NewWordForm: React.FC<NewWordFormProps> = ({ handleCreateNewWord }) => {
  const [formData, setFormData] = useState<ICreateNewVocabWord>({
    word: "",
    deckID: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // Prevent default form submission
    e.preventDefault();
    // Trim whitespace from word and definition
    formData.word = formData.word.trim();
    handleCreateNewWord(formData);
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
      <Button type="submit">Create</Button>
    </form>
  );
};

export default NewWordForm;
