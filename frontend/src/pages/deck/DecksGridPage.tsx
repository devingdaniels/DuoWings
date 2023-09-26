// React
import React, { useState, useEffect } from "react";
import SearchAppBar from "./DeckSearchBar";
// Components
import CreateDeckModalForm from "./CreateDeckModal";
import DeckCardOverview from "./DeckCardOverview";
// Redux
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { createDeck, fetchAllUserDecks, resetDeckStatus } from "../../features/deckSlice";
// Types
import { IWordDeck } from "../../interfaces/index";
import { INewVocabDeck } from "../../interfaces/index";
// Notificiations
// import { ToastError } from "../../utils/Toastify";
// Spinner
import Spinner from "../../utils/Spinner";
// Icons
import { FaCreativeCommonsZero } from "react-icons/fa";
import { Button } from "@mui/material";

const DecksPage: React.FC = () => {
  // Redux
  const { decks, isSuccess, isLoading } = useAppSelector((state) => state.decks);
  const dispatch = useAppDispatch();
  // State
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [deckData, setDeckData] = useState<IWordDeck[]>(decks || []);
  const [filteredDecks, setFilteredDecks] = useState<IWordDeck[]>(deckData || []);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const filterDecks = (value: string) => {
    const searchText = value.toLowerCase();
    setSearchTerm(searchText);
    const filtered = deckData.filter((deck: IWordDeck) =>
      deck.name.toLowerCase().includes(searchText)
    );
    setFilteredDecks(filtered);
  };

  // Modal handlers

  const handleCreateNewDeck = async (deck: INewVocabDeck) => {
    // First close the modal from the UI
    setIsModalOpen(false);
    // Dispatch creation of new deck, should set loading to true
    await dispatch(createDeck(deck));
    // Reset deck loading states
    dispatch(resetDeckStatus());
    // Get updated decks
    await dispatch(fetchAllUserDecks());
  };

  const fetchUserDecks = () => {
    dispatch(fetchAllUserDecks());
  };

  // Get latest user user decks on component mount
  useEffect(() => {
    fetchUserDecks();
  }, []);

  // isSuccess means new data, set it
  useEffect(() => {
    setDeckData(decks);
    setFilteredDecks(decks);
  }, [decks, isSuccess, dispatch]);

  // Modal handlers and event listeners
  const toggleModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsModalOpen(!isModalOpen);
  };

  const handleModalInteraction = (e: KeyboardEvent | MouseEvent) => {
    if (
      (e instanceof KeyboardEvent && e.key === "Escape") ||
      (e instanceof MouseEvent &&
        isModalOpen &&
        (e.target as Element).closest(".modal-content") === null)
    ) {
      setIsModalOpen(false);
    }
  };

  useEffect(() => {
    // Add event listeners
    document.addEventListener("click", handleModalInteraction);
    document.addEventListener("keydown", handleModalInteraction);
    // Cleanup
    return () => {
      document.removeEventListener("click", handleModalInteraction);
      document.removeEventListener("keydown", handleModalInteraction);
    };
  }, [isModalOpen, handleModalInteraction]);

  // Show spinner for any async process
  if (isLoading) {
    return (
      <div className="deck-page-container">
        <Spinner />
      </div>
    );
  }

  // No decks and no state-changing functionality in progress
  if (decks.length === 0 && !isModalOpen && !isLoading) {
    return (
      <div className="deck-page-container-empty">
        <h2>No Decks!</h2>
        <FaCreativeCommonsZero size={65} />
        <button className="creat-new-deck-button" onClick={toggleModal}>
          New Deck
        </button>
      </div>
    );
  }
  // Not loading and user has decks
  return (
    <div className="deck-page-container">
      {!isModalOpen && (
        <>
          <div className="deck-page-search-wrapper">
            <div className="deck-page-search-container">
              <SearchAppBar filterDecks={filterDecks} value={searchTerm} />
            </div>
          </div>
          <div className="deck-grid-container">
            {filteredDecks.map((deck: IWordDeck) => {
              return (
                <span key={deck._id}>
                  <DeckCardOverview deck={deck} fetchUserDecks={fetchUserDecks} />
                </span>
              );
            })}
          </div>
        </>
      )}
      <button className="creat-new-deck-button" onClick={toggleModal}>
        New Deck
      </button>
      {isModalOpen && (
        <div className="modal-container">
          <div className="modal-content">
            <CreateDeckModalForm handleCreateNewDeck={handleCreateNewDeck} />
            <Button variant="contained" className="close-modal-button" onClick={toggleModal}>
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DecksPage;
