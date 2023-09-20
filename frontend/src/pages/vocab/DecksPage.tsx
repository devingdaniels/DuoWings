import React, { useState, useEffect } from "react";
import CreateDeck from "../../components/CreateDeck";
import Deck from "../../components/Deck";
import { fakeDecks } from "./FakeDeckData";
import { Button } from "@mui/material";

const DecksPage: React.FC = () => {
  // State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deckData, setDeckData] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Fucntions
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

  const filterDecks = () => {
    const filtered = fakeDecks.filter((deck: any) =>
      deck.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setDeckData(filtered);
  };

  // Side Effects
  useEffect(() => {
    filterDecks();
  }, [searchTerm]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        isModalOpen &&
        (e.target as Element).closest(".modal-content") === null
      ) {
        setIsModalOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscapeKey);
    document.addEventListener("click", handleClickOutside);
    setDeckData(fakeDecks);

    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isModalOpen]);

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
        {deckData.map((deck: any, i: number) => {
          return <Deck key={i} deck={deck} />;
        })}
      </div>
      <button
        className="bottom-right-button-create-deck-button"
        onClick={toggleModal}
      >
        New Deck
      </button>
      {isModalOpen && (
        <div className="modal-container">
          <div className="modal-content">
            <CreateDeck />
            <Button
              variant="contained"
              className="close-modal-button"
              onClick={toggleModal}
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DecksPage;
