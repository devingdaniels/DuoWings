import axios from "axios";
import { INewVocabDeck } from "../../interfaces/index";
import { useState, ChangeEvent, FormEvent } from "react";

enum ICardInsertionOrder {
  Top = "first",
  Bottom = "last",
  Random = "random",
}

interface NewDeckFormProps {
  handleCloseModal: () => void;
}

const NewDeckForm: React.FC<NewDeckFormProps> = ({ handleCloseModal }) => {
  const deck: INewVocabDeck = {
    name: "",
    description: "",
    tags: [],
    insertOrder: ICardInsertionOrder.Top,
  };

  const [deckData, setDeckData] = useState<INewVocabDeck>(deck);
  const [newTag, setNewTag] = useState<string>("");

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === "insertOrder") {
      setDeckData({
        ...deckData,
        [name]: value as ICardInsertionOrder,
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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleCloseModal();
    try {
      const URL = import.meta.env.VITE_BACKEND_API_DECK + "/create-deck";
      const response = await axios.post(URL, deckData);
      if (response.status === 201) {
        handleCloseModal();
      }
    } catch (error) {
      console.log("Error creating new deck", error);
    }
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
          <select name="insertOrder" value={deckData.insertOrder} onChange={handleInputChange}>
            {Object.values(ICardInsertionOrder).map((val) => (
              <option key={val} value={val}>
                {val}
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
