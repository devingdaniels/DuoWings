import CreateDeckModalForm from "./CreateDeckModal";
import DeckCardOverview from "./DeckCardOverview";
import { IWordDeck } from "../../../interfaces/index";
import React from "react";
import SearchAppBar from "./DeckSearchBar";
import { useAppDispatch } from "../../../app/hooks";
import { useAppSelector } from "../../../app/hooks";
import { useEffect } from "react";
import { useState } from "react";
import { VocabSliceService } from "../../../features/vocabSlice";
import { FcPlus } from "react-icons/fc";
// import { toast } from "react-toastify";

const AllDecksPage: React.FC = () => {
  // Hooks
  const dispatch = useAppDispatch();
  const { decks, isDeckLoading, isError } = useAppSelector((state) => state.vocab);
  // Local state
  const [filteredDecks, setFilteredDecks] = useState<IWordDeck[]>(decks || []);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    const fetchAllDecks = async () => {
      // toast.info("Fetching all decks...");
      await dispatch(VocabSliceService.fetchAllDecks());
    };
    fetchAllDecks();
  }, [dispatch]);

  // Update filteredDecks whenever decks or searchTerm changes
  useEffect(() => {
    const filtered = decks.filter((deck) =>
      deck.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredDecks(filtered);
  }, [decks, searchTerm]);

  const filterDecks = (value: string) => {
    const searchText = value.toLowerCase();
    setSearchTerm(searchText);
    const filtered = decks.filter((deck: IWordDeck) =>
      deck.name.toLowerCase().includes(searchText)
    );
    setFilteredDecks(filtered);
  };

  const NewDeckButton = () => {
    return (
      <span
        className="deck-page-create-deck-button"
        onClick={(event: any) => {
          // Prevent the event from bubbling up the DOM tree and triggering the parent click event, which would close the modal
          event.stopPropagation();
          // Close the modal
          setIsModalOpen(true);
        }}
      >
        <FcPlus size={35} />
        Create Deck
      </span>
    );
  };

  // No decks and no state-changing functionality in progress
  if (decks.length === 0 && !isModalOpen && !isDeckLoading && !isError) {
    return (
      <div className="all-decks-page-container-empty">
        <h2>No Decks ☹️</h2>
        <NewDeckButton />
      </div>
    );
  }

  return (
    <div className="all-decks-page-container">
      <div className="all-deck-page-search-and-create-wrapper">
        <div className="all-deck-page-search-container">
          <SearchAppBar filterDecks={filterDecks} value={searchTerm} />
        </div>
        {!searchTerm && <NewDeckButton />}
      </div>
      <div className="all-decks-grid-container">
        {filteredDecks.map((deck: IWordDeck) => {
          return <DeckCardOverview key={deck._id} deck={deck} />;
        })}
      </div>
      {isModalOpen && (
        <CreateDeckModalForm decks={decks} isModalOpen={isModalOpen} onClose={closeModal} />
      )}
    </div>
  );
};

export default AllDecksPage;
