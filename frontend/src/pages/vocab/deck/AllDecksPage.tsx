// React
import React, { useState, useEffect } from "react";
// Components
import SearchAppBar from "./DeckSearchBar";
import CreateDeckModalForm from "./CreateDeckModal";
import DeckCardOverview from "./DeckCardOverview";
//  Redux store actions
import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import {
  createDeck,
  fetchAllUserDecks,
  resetCurrentDeck,
  resetDeckStatus,
} from "../../../features/vocabSlice";
// TypeScript interfaces
import { ICreateNewDeck, IWordDeck } from "../../../interfaces/index";
// Loading spinners
import Spinner from "../../../utils/Spinner";
// Icons
import { AiOutlinePlus } from "react-icons/ai";
import { FaCreativeCommonsZero } from "react-icons/fa";

const AllDecksPage: React.FC = () => {
  // Redux
  const dispatch = useAppDispatch();
  const { decks, isSuccess, isLoading, isError } = useAppSelector(
    (state) => state.vocab
  );
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

  const handleCreateNewDeck = async (deck: ICreateNewDeck) => {
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
    dispatch(fetchAllUserDecks());
    dispatch(resetCurrentDeck());
  }, [dispatch]);

  // If decks change, update state
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
  // Note: this is a bit of a hacky solution, but it works
  useEffect(() => {
    const handleModalInteraction = (e: KeyboardEvent | MouseEvent) => {
      if (
        (e instanceof KeyboardEvent && e.key === "Escape") ||
        (e instanceof MouseEvent &&
          isModalOpen &&
          (e.target as Element).closest(".modal-content") === null) // Clicked outside of modal container
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

  const NewDeckButton = () => {
    return (
      <AiOutlinePlus
        className="add-new-deck-button"
        size={80}
        style={{ color: "red" }}
        onClick={toggleModal}
      ></AiOutlinePlus>
    );
  };

  if (isError) return <p>Application error. Please refresh the page</p>;

  // Show spinner for any async process
  if (isLoading) {
    return (
      <div className="all-decks-page-container">
        <Spinner />
      </div>
    );
  }

  // No decks and no state-changing functionality in progress
  if (decks.length === 0 && !isModalOpen && !isLoading) {
    return (
      <div className="all-decks-page-container-empty">
        <h2>No Decks!</h2>
        <FaCreativeCommonsZero size={65} />
        <NewDeckButton />
      </div>
    );
  }

  // Primary JSX return
  return (
    <div className="all-decks-page-container">
      {!isModalOpen && (
        <>
          <div className="all-deck-page-search-wrapper">
            <div className="all-deck-page-search-container">
              <SearchAppBar filterDecks={filterDecks} value={searchTerm} />
            </div>
          </div>
          <div className="all-decks-grid-container">
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
          <NewDeckButton />
        </>
      )}
      {isModalOpen && (
        <div className="modal-container">
          <CreateDeckModalForm
            handleCreateNewDeck={handleCreateNewDeck}
            toggleModal={toggleModal}
            decks={deckData}
          />
        </div>
      )}
    </div>
  );
};

export default AllDecksPage;
