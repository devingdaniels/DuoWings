import { INewVocabDeck } from "../interfaces/index";
import React, { useState, ChangeEvent, FormEvent } from "react";

enum ICardInsertionOrder {
  Top = "top",
  Bottom = "bottom",
  Random = "random",
}

const NewDeckForm: React.FC = () => {
  const initialDeckData: INewVocabDeck = {
    name: "",
    description: "",
    tags: [],
    preferences: {
      insertOrder: ICardInsertionOrder.Top,
      favorited: false,
    },
  };

  const [deckData, setDeckData] = useState<INewVocabDeck>(initialDeckData);
  const [newTag, setNewTag] = useState<string>("");

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> // Include HTMLSelectElement here
  ) => {
    const { name, value } = e.target;
    if (name === "insertOrder") {
      setDeckData({
        ...deckData,
        preferences: {
          ...deckData.preferences,
          [name]: value as ICardInsertionOrder,
        },
      });
    } else {
      setDeckData({ ...deckData, [name]: value });
    }
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
          <select
            name="insertOrder"
            value={deckData.preferences.insertOrder}
            onChange={handleInputChange}
          >
            {Object.values(ICardInsertionOrder).map((point) => (
              <option key={point} value={point}>
                {point}
              </option>
            ))}
          </select>
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
