// React
import React, { useState, useEffect } from "react";
import SearchAppBar from "./SearchBar";
// Components
import CreateDeckModal from "./CreateDeckModal";
import Deck from "./Deck";
// MUI
import { Button } from "@mui/material";
// Redux
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { fetchAllUserDecks, resetDeckStatus } from "../../features/deckSlice";
// Types
import { IWordDeck } from "../../interfaces/index";
import { ToastError } from "../../utils/Toastify";
// Spinner
import Spinner from "../../utils/Spinner";
// Icons
import { FaCreativeCommonsZero } from "react-icons/fa";

const DecksPage: React.FC = () => {
  // Redux
  const dispatch = useAppDispatch();
  const { decks, isSuccess, isError, isLoading, message } = useAppSelector((state) => state.decks);
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

  const handleCloseModal = () => {
    setIsModalOpen(false);
    dispatch(fetchAllUserDecks());
  };

  const handleDeckClick = (deck: IWordDeck) => {
    console.log(deck);
  };

  // When component mounts, fetch all user decks
  useEffect(() => {
    dispatch(fetchAllUserDecks());
  }, []);

  useEffect(() => {
    if (isSuccess) {
      setFilteredDecks(decks);
    }

    if (isError) {
      ToastError(message);
    }

    return () => {
      setTimeout(() => {
        dispatch(resetDeckStatus());
      }, 1000);
    };
  }, [decks, isSuccess, isLoading, isError, message, dispatch]);

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

  if (decks.length === 0 && !isModalOpen && !isLoading) {
    return (
      <div className="deck-page-container-empty">
        <h2>No Decks!</h2>
        <FaCreativeCommonsZero size={65} />
        <button className="bottom-right-button-create-deck-button" onClick={toggleModal}>
          New Deck
        </button>
      </div>
    );
  }

  return (
    <div className="deck-page-container">
      <div className="deck-page-search-wrapper">
        <div className="deck-page-search-container">
          <SearchAppBar filterDecks={filterDecks} value={searchTerm} />
        </div>
      </div>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="deck-grid-container">
          {filteredDecks.map((deck: IWordDeck) => {
            return (
              <span key={deck._id} onClick={() => handleDeckClick(deck)}>
                <Deck deck={deck} />
              </span>
            );
          })}
        </div>
      )}
      <button className="bottom-right-button-create-deck-button" onClick={toggleModal}>
        New Deck
      </button>
      {isModalOpen && (
        <div className="modal-container">
          <div className="modal-content">
            <CreateDeckModal handleCloseModal={handleCloseModal} />
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
