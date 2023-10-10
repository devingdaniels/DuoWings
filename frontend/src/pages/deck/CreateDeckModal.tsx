import { INewVocabDeck } from "../../interfaces/index";
import { useState, ChangeEvent, FormEvent } from "react";
import { Button } from "@mui/material";
import { BiSolidPlusCircle } from "react-icons/bi";

// Insert order when creating a new word inside a deck
enum ICardInsertionOrder {
  Top = "first",
  Bottom = "last",
  Random = "random",
}

interface Props {
  handleCreateNewDeck: (deck: INewVocabDeck) => void;
  toggleModal: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const CreateDeckModalForm = ({ handleCreateNewDeck, toggleModal }: Props) => {
  const deck: INewVocabDeck = {
    name: "",
    description: "",
    tags: [],
    insertOrder: ICardInsertionOrder.Top,
  };

  const [deckFormData, setDeckData] = useState<INewVocabDeck>(deck);
  const [newTag, setNewTag] = useState<string>("");

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === "insertOrder") {
      setDeckData({
        ...deckFormData,
        [name]: value as ICardInsertionOrder,
      });
    } else {
      setDeckData({ ...deckFormData, [name]: value });
    }
  };

  const handleAddTag = () => {
    // Prevent empty tags and duplicate tags
    if (newTag.trim() !== "" && !deckFormData.tags.includes(newTag)) {
      setDeckData({ ...deckFormData, tags: [...deckFormData.tags, newTag] });
    }
    setNewTag("");
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    // Prevent page reload
    e.preventDefault();
    // function will close modal, API POST to create card, handle loading state, etc
    handleCreateNewDeck(deckFormData);
  };

  return (
    <div className="modal-content">
      <form onSubmit={handleSubmit} className="modal-form-container">
        <h2>New Deck</h2>
        <div>
          <input
            type="text"
            name="name"
            value={deckFormData.name}
            onChange={handleInputChange}
            placeholder="Deck Title"
            required
          />
          <br />
          <textarea
            name="description"
            value={deckFormData.description}
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
          <BiSolidPlusCircle onClick={handleAddTag} />
          <select
            name="insertOrder"
            value={deckFormData.insertOrder}
            onChange={handleInputChange}
          >
            {Object.values(ICardInsertionOrder).map((val) => (
              <option key={val} value={val}>
                {val}
              </option>
            ))}
          </select>
        </div>
        <ul>
          {deckFormData.tags.map((tag, index) => (
            <li key={index}>{tag}</li>
          ))}
        </ul>
        <div>
          <Button type="submit">Create Deck</Button>
        </div>
        <Button
          variant="contained"
          className="close-modal-button"
          onClick={toggleModal}
        >
          Cancel
        </Button>
      </form>
    </div>
  );
};

export default CreateDeckModalForm;
