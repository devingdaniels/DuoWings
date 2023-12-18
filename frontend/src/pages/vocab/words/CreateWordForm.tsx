import React, { useState } from "react";
import { ICreateNewVocabWord } from "../../../interfaces/index";

interface NewWordFormProps {
  handleCreateNewWord: (formData: ICreateNewVocabWord) => void;
}

const NewWordForm: React.FC<NewWordFormProps> = ({ handleCreateNewWord }) => {
  const [formData, setFormData] = useState<ICreateNewVocabWord>({
    word: "",
    definition: "",
    deckID: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Trim whitespace from word and definition
    formData.word = formData.word.trim();
    formData.definition = formData.definition.trim();
    // Reset form
    setFormData({
      word: "",
      definition: "",
      deckID: "",
    });
    handleCreateNewWord(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
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
      <input
        type="text"
        id="definition"
        value={formData.definition}
        required
        placeholder="Enter a definition"
        onChange={(e) =>
          setFormData({
            ...formData,
            definition: e.target.value,
          })
        }
      />
      <button type="submit">Create</button>
    </form>
  );
};

export default NewWordForm;
