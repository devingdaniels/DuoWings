import { deckAPI } from "../../api/DeckAPI";
import { INewVocabDeck } from "../../interfaces/index";
import { useState, ChangeEvent, FormEvent } from "react";

enum ICardInsertionOrder {
  Top = "first",
  Bottom = "last",
  Random = "random",
}

interface NewDeckFormProps {
  closeModal: () => void;
  updateDeckData: () => void;
}

const CreateDeckModal: React.FC<NewDeckFormProps> = ({ closeModal, updateDeckData }) => {
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
    const key = name;
    if (name === "insertOrder") {
      setDeckData({
        ...deckData,
        [key]: value as ICardInsertionOrder,
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
    //TODO: Fix timing of loading spinner after modal closes
    e.preventDefault();
    // Trigger parent component to re-fetch all decks
    closeModal();
    // Send POST request to create a new deck
    await deckAPI.createNewDeck(deckData);
    //
    updateDeckData();
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

export default CreateDeckModal;
