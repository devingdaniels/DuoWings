import React, { useState, ChangeEvent, FormEvent } from "react";
import { toastService } from "../../../utils/Toastify";
import { ICreateNewDeck, IWordDeck } from "../../../interfaces/index";
import Button from "@mui/material/Button";

interface Props {
  handleCreateNewDeck: (deck: ICreateNewDeck) => void;
  toggleModal: (val: boolean) => void;
  decks: IWordDeck[];
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
    // Check if deck already exists
    if (isDuplicateDeck(deckFormData.name)) {
      toastService.warning(`Deck ${deckFormData.name} already exists!`);
      return;
    }
    handleCreateNewDeck(deckFormData);
  };

  const closeModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    toggleModal(false);
  };

  return (
    <div className="modal-container">
      <div className="modal-content">
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
            <Button onClick={closeModal} color="error" variant="contained">
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

//! The code below wille be used to allow for keyboard and mouse event listeners to close the modal
// useEffect(() => {
//   const handleModalInteraction = (e: KeyboardEvent | MouseEvent) => {
//     // Clicked outside of modal container
//     if (
//       (e instanceof KeyboardEvent && e.key === "Escape") ||
//       (e instanceof MouseEvent &&
//         isModal &&
//         (e.target as Element).closest(".modal-content") === null)
//     ) {
//       console.log("closing modal");
//       // toggleModal(false);
//     }
//   };
//   // Add event listeners
//   document.addEventListener("click", handleModalInteraction);
//   document.addEventListener("keydown", handleModalInteraction);
//   // Cleanup
//   return () => {
//     document.removeEventListener("click", handleModalInteraction);
//     document.removeEventListener("keydown", handleModalInteraction);
//   };
// }, [isModal, toggleModal]);
