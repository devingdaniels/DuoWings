import React, { useState, ChangeEvent, FormEvent } from "react";
import { Button } from "@mui/material";
import { ToastWarning } from "../../../utils/Toastify";
import { ICreateNewDeck } from "../../../interfaces/index";
// import { useEffect } from "react";

interface Props {
  isModal: boolean;
  handleCreateNewDeck: (deck: ICreateNewDeck) => void;
  toggleModal: (val: boolean) => void;
  decks: ICreateNewDeck[];
}

const CreateDeckModalForm: React.FC<Props> = ({
  isModal,
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

  const closeModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    // e.stopPropagation();
    toggleModal(false);
  };

  return (
    <div className="modal-container">
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
          <div className="create-deck-modal-container">
            <button type="submit">Create</button>
            <button onClick={closeModal}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateDeckModalForm;
