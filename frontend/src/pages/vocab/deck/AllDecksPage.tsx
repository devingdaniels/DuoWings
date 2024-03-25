import CreateDeckModalForm from "./CreateDeckModal";
import DeckCardOverview from "./DeckCardOverview";
import { ICreateNewDeck, IWordDeck } from "../../../interfaces/index";
import React from "react";
import SearchAppBar from "./DeckSearchBar";
import Spinner from "../../../utils/Spinner";
import { useAppDispatch } from "../../../app/hooks";
import { useAppSelector } from "../../../app/hooks";
import { useEffect } from "react";
import { useState } from "react";
import { VocabSliceService } from "../../../features/vocabSlice";
import { toastService } from "../../../utils/Toastify";
import Button from "@mui/material/Button";

const AllDecksPage: React.FC = () => {
  // Hooks
  const dispatch = useAppDispatch();
  const { decks, isLoading, isError } = useAppSelector((state) => state.vocab);
  // Local state
  const [filteredDecks, setFilteredDecks] = useState<IWordDeck[]>(decks || []);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const closeModal = () => setIsModalOpen(false);

  const handleCreateNewDeck = async (deck: ICreateNewDeck) => {
    // Close modal
    closeModal();
    // Dispatch creation of new deck, should set loading to true
    const response = await dispatch(VocabSliceService.createDeck(deck));

    if (response.type === "vocab/createDeck/fulfilled") {
      toastService.success(`Created ${response.payload.deck.name}`);
      // Reset flags
      dispatch(VocabSliceService.resetDeckStatusFlagsToDefault());
    } else {
      toastService.error(response.payload);
      //
      dispatch(VocabSliceService.resetErrorState());
    }
    // Get updated decks
    fetchUserDecks();
  };

  const filterDecks = (value: string) => {
    const searchText = value.toLowerCase();
    setSearchTerm(searchText);
    const filtered = decks.filter((deck: IWordDeck) =>
      deck.name.toLowerCase().includes(searchText)
    );
    setFilteredDecks(filtered);
  };

  const fetchUserDecks = async () => await dispatch(VocabSliceService.fetchAllDecks());

  useEffect(() => {
    dispatch(VocabSliceService.fetchAllDecks());
    dispatch(VocabSliceService.resetCurrentDeck());
  }, [dispatch]);

  // Update filteredDecks whenever decks or searchTerm changes
  useEffect(() => {
    const filtered = decks.filter((deck) =>
      deck.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredDecks(filtered);
  }, [decks, searchTerm]);

  const NewDeckButton = () => {
    return (
      <Button
        variant="contained"
        onClick={(event) => {
          // Prevent the event from bubbling up the DOM tree and triggering the parent click event, which would close the modal
          event.stopPropagation();
          setIsModalOpen(true);
        }}
      >
        Create Deck
      </Button>
    );
  };

  if (isLoading) {
    return (
      <div className="all-decks-page-container">
        <Spinner />
      </div>
    );
  }

  // No decks and no state-changing functionality in progress
  if (decks.length === 0 && !isModalOpen && !isLoading && !isError) {
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
          return <DeckCardOverview key={deck._id} deck={deck} fetchUserDecks={fetchUserDecks} />;
        })}
      </div>
      {isModalOpen && (
        <CreateDeckModalForm
          handleCreateNewDeck={handleCreateNewDeck}
          decks={decks}
          isModalOpen={isModalOpen}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default AllDecksPage;
