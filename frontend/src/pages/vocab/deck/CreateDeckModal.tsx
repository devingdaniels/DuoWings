import { INewVocabDeck } from "../../../interfaces/index";
import { useState, ChangeEvent, FormEvent } from "react";
import { Button } from "@mui/material";
// Bring in the toast utility
import { ToastWarning } from "../../../utils/Toastify";

interface Props {
  handleCreateNewDeck: (deck: INewVocabDeck) => void; // Callback function to handle creating a new deck
  toggleModal: (e: React.MouseEvent<HTMLButtonElement>) => void; // Callback function to toggle modal
  decks: INewVocabDeck[];
}

const CreateDeckModalForm = ({
  handleCreateNewDeck,
  toggleModal,
  decks,
}: Props) => {
  // Deck form data
  const deck: INewVocabDeck = {
    name: "",
    description: "",
  };

  const [deckFormData, setDeckData] = useState<INewVocabDeck>(deck);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setDeckData({ ...deckFormData, [name]: value });
  };

  const isDuplicateDeck = (name: string) => {
    return decks.some((deck) => deck.name === name);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    // Prevent page reload
    e.preventDefault();
    if (isDuplicateDeck(deckFormData.name)) {
      ToastWarning(`Deck ${deckFormData.name} already exists!`);
      return;
    }
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
        </div>
        <Button type="submit" variant="contained">
          Create Deck
        </Button>
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
