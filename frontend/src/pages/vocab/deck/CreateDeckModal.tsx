import React, { useState, useEffect, ChangeEvent, FormEvent, useRef } from "react";
import { toastService } from "../../../utils/Toastify";
import { ICreateNewDeck, IWordDeck } from "../../../interfaces/index";
import Button from "@mui/material/Button";

interface Props {
  handleCreateNewDeck: (deck: ICreateNewDeck) => void;
  decks: IWordDeck[];
  isModalOpen: boolean;
  onClose: () => void;
}

const CreateDeckModalForm: React.FC<Props> = ({
  handleCreateNewDeck,
  decks,
  isModalOpen,
  onClose,
}: Props) => {
  // Component state
  const [deckFormData, setDeckData] = useState<ICreateNewDeck>({
    name: "",
    description: "",
  });
  // Ref to the modal container
  const modalRef = useRef<HTMLDivElement>(null);

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
    // Check if deck already exists
    if (isDuplicateDeck(deckFormData.name)) {
      toastService.warning(`Deck ${deckFormData.name} already exists!`);
      return;
    }
    handleCreateNewDeck(deckFormData);
  };

  useEffect(() => {
    // Function to handle the key press event
    const handleKeyDown = (event: KeyboardEvent) => {
      // Check if the 'Esc' key was pressed
      if (event.key === "Escape") {
        onClose(); // Call the onClose function passed as a prop
      }
    };

    // Function to handle the mouse click event
    const handleClickOutside = (event: MouseEvent) => {
      // Assuming your modal container has a ref called modalRef;
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose(); // Call the onClose function if the click is outside the modal content
      }
    };

    // Add event listeners when the component mounts
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("click", handleClickOutside);

    // Remove event listeners when the component unmounts
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("click", handleClickOutside);
    };
  }, [onClose]); // The effect depends on the onClose function

  // If modal is not open, return null
  if (!isModalOpen) return null;

  return (
    <div className="modal-container">
      <div ref={modalRef} className="modal-content">
        <form onSubmit={handleSubmit} className="modal-form-container">
          <h2>Create Deck</h2>
          <div>
            <input
              type="text"
              name="name"
              value={deckFormData.name}
              onChange={handleInputChange}
              placeholder="Title..."
              maxLength={50}
              required
            />
            <br />
            <input
              name="description"
              value={deckFormData.description}
              onChange={handleInputChange}
              placeholder="Description..."
            />
            <br />
          </div>
          <div className="create-deck-modal-button-container">
            <Button onClick={() => onClose()} color="error" variant="contained">
              ESC
            </Button>
            <Button type="submit" onClick={() => handleSubmit} variant="contained">
              Create
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateDeckModalForm;
