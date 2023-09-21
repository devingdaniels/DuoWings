import React, { useState, useEffect, useMemo } from "react";
import CreateDeck from "./CreateDeck";
import Deck from "./Deck";
import { Button } from "@mui/material";
// Redux
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { fetchAllUserDecks, resetDeckStatus } from "../../features/deckSlice";

// Types
import { IWordDeck } from "../../interfaces/index";
import { ToastError, ToastInfo } from "../../utils/Toastify";

const DecksPage: React.FC = () => {
  // Redux
  const dispatch = useAppDispatch();
  const { decks, isSuccess, isError, isLoading, message } = useAppSelector((state) => state.decks);
  // State
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [deckData, setDeckData] = useState<IWordDeck[]>(decks || []);
  const [filteredDecks, setFilteredDecks] = useState<IWordDeck[]>(deckData || []);
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Handlers
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

  const filterDecks = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchText = e.target.value.toLowerCase();
    setSearchTerm(searchText);
    const filtered = deckData.filter((deck: IWordDeck) =>
      deck.name.toLowerCase().includes(searchText)
    );
    setFilteredDecks(filtered);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Refresh data
    dispatch(fetchAllUserDecks());
  };

  const handleDeckClick = (deck: IWordDeck) => {
    console.log(deck);
  };

  // Get the user decks
  useEffect(() => {
    // Fetches all user decks and stores them in decks state in redux
    dispatch(fetchAllUserDecks());
  }, []);

  useEffect(() => {
    if (isSuccess) {
      setFilteredDecks(decks);
    }

    if (isError) {
      ToastError(message);
    }

    if (isLoading) {
      ToastInfo("Loading decks");
      console.log("Loading decks");
    }

    return () => {
      dispatch(resetDeckStatus());
    };
  }, [decks, isSuccess, isLoading, isError, message, dispatch]);

  useEffect(() => {
    document.addEventListener("keydown", handleEscapeKey);
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isModalOpen, handleEscapeKey, handleClickOutside]);

  return (
    <div className="deck-page-container">
      <div>
        <input type="text" placeholder="Search decks" value={searchTerm} onChange={filterDecks} />
      </div>
      <div className="deck-grid-container">
        {filteredDecks.map((deck: IWordDeck) => {
          return (
            <span key={deck._id} onClick={() => handleDeckClick(deck)}>
              <Deck deck={deck} />
            </span>
          );
        })}
      </div>
      <button className="bottom-right-button-create-deck-button" onClick={toggleModal}>
        New Deck
      </button>
      {isModalOpen && (
        <div className="modal-container">
          <div className="modal-content">
            <CreateDeck toggleModal={handleCloseModal} />
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
