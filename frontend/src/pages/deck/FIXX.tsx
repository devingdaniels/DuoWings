// React
import React, { useState, useEffect } from "react";
import SearchAppBar from "./DeckSearchBar";
// Components
import CreateDeckModalForm from "./CreateDeckModal";
import Deck from "./DeckCardOverview";
// Redux
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { createDeck, fetchAllUserDecks, resetDeckStatus } from "../../features/deckSlice";
// Types
import { IWordDeck } from "../../interfaces/index";
import { INewVocabDeck } from "../../interfaces/index";
// Notificiations
import { ToastError } from "../../utils/Toastify";
// Spinner
import Spinner from "../../utils/Spinner";
// Icons
import { FaCreativeCommonsZero } from "react-icons/fa";
import { Button } from "@mui/material";

const DecksPage: React.FC = () => {
  // Redux
  const { decks, isSuccess, isError, isLoading, message } = useAppSelector((state) => state.decks);
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

  const updateDeckData = () => {
    dispatch(fetchAllUserDecks());
  };

  // Modal handlers
  const toggleModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsModalOpen(!isModalOpen);
  };

  const handleEscapeKey = (e: KeyboardEvent) => {
    if (e.key === "Escape" && isModalOpen) {
      setIsModalOpen(false);
    }
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (isModalOpen && (e.target as Element).closest(".modal-content") === null) {
      setIsModalOpen(false);
    }
  };

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

  useEffect(() => {
    updateDeckData();
  }, []);

  useEffect(() => {
    setDeckData(decks);
    setFilteredDecks(decks);
  }, [isSuccess]);

  useEffect(() => {
    // Add event listeners
    document.addEventListener("click", handleClickOutside);
    document.addEventListener("keydown", handleEscapeKey);
    // Cleanup
    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isModalOpen, handleEscapeKey, handleClickOutside]);

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

  return (
    <div className="deck-page-container">
      {isLoading ? (
        <Spinner />
      ) : (
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
                  <Deck deck={deck} updateDeckData={updateDeckData} />
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
