// React
import React, { useState, useEffect } from "react";
import SearchAppBar from "./DeckSearchBar";
import CreateDeckModalForm from "./CreateDeckModal";
import DeckCardOverview from "./DeckCardOverview";
import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import {
  createDeck,
  fetchAllUserDecks,
  resetDeckStatus,
} from "../../../features/deckSlice";
import { IWordDeck } from "../../../interfaces/index";
import { INewVocabDeck } from "../../../interfaces/index";
import Spinner from "../../../utils/Spinner";
import { FaCreativeCommonsZero } from "react-icons/fa";

// AllDeckComponent
const AllDecksPage: React.FC = () => {
  // Redux
  const { decks, isSuccess, isLoading } = useAppSelector(
    (state) => state.decks
  );
  const dispatch = useAppDispatch();
  // State
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [deckData, setDeckData] = useState<IWordDeck[]>(decks || []);
  const [filteredDecks, setFilteredDecks] = useState<IWordDeck[]>(
    deckData || []
  );
  const [searchTerm, setSearchTerm] = useState<string>("");

  const filterDecks = (value: string) => {
    const searchText = value.toLowerCase();
    setSearchTerm(searchText);
    const filtered = deckData.filter((deck: IWordDeck) =>
      deck.name.toLowerCase().includes(searchText)
    );
    setFilteredDecks(filtered);
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

  const fetchUserDecks = () => {
    dispatch(fetchAllUserDecks());
  };

  // Get latest user decks on component mount
  useEffect(() => {
    fetchUserDecks();
  }, []);

  // if decks or dispatch has ocurred, set new data
  useEffect(() => {
    setDeckData(decks);
    setFilteredDecks(decks);
  }, [decks, isSuccess, dispatch]);

  // Modal handlers and event listeners
  const toggleModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsModalOpen(!isModalOpen);
  };

  // Modal handler
  useEffect(() => {
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
    // Add event listeners
    document.addEventListener("click", handleModalInteraction);
    document.addEventListener("keydown", handleModalInteraction);
    // Cleanup
    return () => {
      document.removeEventListener("click", handleModalInteraction);
      document.removeEventListener("keydown", handleModalInteraction);
    };
  }, [isModalOpen]);

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
        <button className="create-new-deck-button" onClick={toggleModal}>
          Create Deck
        </button>
      </div>
    );
  }

  // Primary JSX return
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
                  <DeckCardOverview
                    deck={deck}
                    fetchUserDecks={fetchUserDecks}
                  />
                </span>
              );
            })}
          </div>
        </>
      )}
      <button className="create-new-deck-button" onClick={toggleModal}>
        New Deck
      </button>
      {isModalOpen && (
        <div className="modal-container">
          <CreateDeckModalForm
            handleCreateNewDeck={handleCreateNewDeck}
            toggleModal={toggleModal}
          />
        </div>
      )}
    </div>
  );
};

export default AllDecksPage;
