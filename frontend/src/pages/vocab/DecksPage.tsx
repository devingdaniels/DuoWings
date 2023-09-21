import React, { useState, useEffect } from "react";
import CreateDeck from "./CreateDeck";
import Deck from "./Deck";
import { Button } from "@mui/material";
// Redux
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { fetchDecks } from "../../features/deckSlice";
// Types
import { IWordDeck } from "../../interfaces/index";

const DecksPage: React.FC = () => {
  // Redux
  const dispatch = useAppDispatch();
  const { decks, isSuccess, isError, isLoading } = useAppSelector((state) => state.decks);
  // State
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [deckData, setDeckData] = useState<IWordDeck[]>(decks || []);
  const [filteredDecks, setFilteredDecks] = useState<IWordDeck[]>(deckData || []);
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Handlers
  const handleDeckSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

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

  const filterDecks = () => {
    const filtered = deckData.filter((deck: IWordDeck) =>
      deck.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredDecks(filtered);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Refresh data
    dispatch(fetchDecks());
  };

  const handleDeckClick = (deck: IWordDeck) => {
    console.log(deck);
  };

  // Get the user decks
  useEffect(() => {
    dispatch(fetchDecks());
  }, []);

  useEffect(() => {
    if (isSuccess) {
      setFilteredDecks(decks);
    }

    if (isError) {
      console.log("Error fetching decks");
    }

    if (isLoading) {
      console.log("Loading decks");
    }
  }, [decks, isSuccess, isLoading, isError, dispatch]);

  useEffect(() => {
    filterDecks();
  }, [searchTerm]);

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
        <input
          type="text"
          placeholder="Search decks"
          value={searchTerm}
          onChange={handleDeckSearch}
        />
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
