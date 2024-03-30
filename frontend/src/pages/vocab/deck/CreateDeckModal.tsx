import React, { useState, useEffect, ChangeEvent, FormEvent, useRef } from "react";
import { toastService } from "../../../utils/Toastify";
import { ICreateNewDeck, IWordDeck } from "../../../interfaces/index";
import Button from "@mui/material/Button";
import { useAppDispatch } from "../../../app/hooks";
import { VocabSliceService } from "../../../features/vocabSlice";
import Spinner from "../../../utils/Spinner";
import { useAppSelector } from "../../../app/hooks";

interface Props {
  decks: IWordDeck[];
  isModalOpen: boolean;
  onClose: () => void;
}

const CreateDeckModalForm: React.FC<Props> = ({ ...props }: Props) => {
  // Props
  const { decks, isModalOpen, onClose } = props;
  // Redux
  const { isDeckLoading } = useAppSelector((state) => state.vocab);
  const dispatch = useAppDispatch();
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

  const handleCreateNewDeck = async (e: FormEvent) => {
    e.preventDefault();

    // Check if deck already exists
    if (isDuplicateDeck(deckFormData.name)) {
      toastService.warning(`Deck ${deckFormData.name} already exists!`);
      return;
    }

    // Dispatch creation of new deck, should set loading to true
    const response = await dispatch(VocabSliceService.createDeck(deckFormData));

    if (response.type === "vocab/createDeck/fulfilled") {
      // Reset flags
      dispatch(VocabSliceService.resetDeckStatusFlagsToDefault());
      // Fetch the user decks
      await dispatch(VocabSliceService.fetchAllDecks());
      // Signal to parent component to close the modal and fetch user decks
      onClose();
      // Show success toast
      toastService.success(`Created ${response.payload.deck.name}`);
    } else {
      toastService.error(response.payload);
      dispatch(VocabSliceService.resetErrorState());
    }
  };

  // Handle user pressing ESC key or clicking outside the modal
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      // Assuming your modal container has a ref called modalRef;
      // Check if the click is outside the modal content
      // This is done by checking if the click target is not within the modal content, i.e., the modalRef
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("click", handleClickOutside);

    // Remove event listeners when the component unmounts
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("click", handleClickOutside);
    };
  }, [onClose]); // If the parent component changes the onClose function, the effect will run again. This is to ensure that the effect always uses the latest onClose function.

  // If modal is not open, return null
  if (!isModalOpen) return null;

  return (
    <div className="modal-container">
      <div ref={modalRef} className="modal-content">
        <form onSubmit={handleCreateNewDeck} className="modal-form-container">
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
            {isDeckLoading ? (
              <Spinner />
            ) : (
              <>
                <Button onClick={() => onClose()} color="error" variant="contained">
                  ESC
                </Button>
                <Button type="submit" onClick={() => handleCreateNewDeck} variant="contained">
                  Create
                </Button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateDeckModalForm;
