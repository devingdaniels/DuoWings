import React, { useState, ChangeEvent, FormEvent } from "react";
import { Button } from "@mui/material";
import { ToastWarning } from "../../../utils/Toastify";
import { ICreateNewDeck } from "../../../interfaces/index";

interface Props {
  handleCreateNewDeck: (deck: ICreateNewDeck) => void;
  toggleModal: (e: React.MouseEvent<HTMLButtonElement>) => void;
  decks: ICreateNewDeck[];
}

const CreateDeckModalForm: React.FC<Props> = ({
  handleCreateNewDeck,
  toggleModal,
  decks,
}: Props) => {
  // Component state
  const [deckFormData, setDeckData] = useState<ICreateNewDeck>({
    name: "",
    description: "",
  });

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
    e.preventDefault();
    if (isDuplicateDeck(deckFormData.name)) {
      ToastWarning(`Deck ${deckFormData.name} already exists!`);
      return;
    }
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
