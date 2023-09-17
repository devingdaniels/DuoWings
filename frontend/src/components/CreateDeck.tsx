import { INewVocabWord } from "../interfaces/index";
import React, { useState, ChangeEvent, FormEvent } from "react";

const NewDeckForm: React.FC = () => {
  const initialDeckData: INewVocabWord = {
    name: "",
    description: "",
    insertOrder: [], // not sure about using an array data strcuture for this
    tags: [],
    preferences: {
      displayOrder: [new Number()],
      favorited: false,
      color: "",
    },
  };

  const [deckData, setDeckData] = useState<INewVocabWord>(initialDeckData);
  const [newTag, setNewTag] = useState<string>("");

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setDeckData({ ...deckData, [name]: value });
  };

  const handleAddTag = () => {
    if (newTag.trim() !== "" && !deckData.tags.includes(newTag)) {
      setDeckData({ ...deckData, tags: [...deckData.tags, newTag] });
    }
    setNewTag("");
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(deckData);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2>Create a New Deck</h2>
        <div>
          <input
            type="text"
            name="name"
            value={deckData.name}
            onChange={handleInputChange}
            placeholder="Deck Title"
            required
          />
          <br />
          <textarea
            name="description"
            value={deckData.description}
            onChange={handleInputChange}
            placeholder="Deck Description"
          />
          <br />
          <input
            type="text"
            name="newTag"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            placeholder="Tags"
          />
          <button type="button" onClick={handleAddTag}>
            Add Tag
          </button>
        </div>
        <ul>
          {deckData.tags.map((tag, index) => (
            <li key={index}>{tag}</li>
          ))}
        </ul>
        <div>
          <button type="submit">Create Deck</button>
        </div>
      </form>
    </>
  );
};

export default NewDeckForm;
