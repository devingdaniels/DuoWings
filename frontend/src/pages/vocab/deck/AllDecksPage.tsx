import { AiOutlinePlus } from "react-icons/ai";
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

const AllDecksPage: React.FC = () => {
  // Hooks
  const dispatch = useAppDispatch();
  const { decks, isLoading, isError } = useAppSelector((state) => state.vocab);
  // Local state
  const [filteredDecks, setFilteredDecks] = useState<IWordDeck[]>(decks || []);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isModal, setIsModal] = useState<boolean>(false);

  const toggleModal = (val: boolean) => setIsModal(val);
  const fetchUserDecks = async () => await dispatch(VocabSliceService.fetchAllDecks());

  const handleCreateNewDeck = async (deck: ICreateNewDeck) => {
    // First close the modal
    setIsModal(false);

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
      <AiOutlinePlus
        className="create-new-deck-button"
        size={80}
        style={{ color: "red" }}
        onClick={() => {
          setIsModal(true);
        }}
      ></AiOutlinePlus>
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
  if (decks.length === 0 && !isModal && !isLoading && !isError) {
    return (
      <div className="all-decks-page-container-empty">
        <h2>No Decks ☹️</h2>
        <NewDeckButton />
      </div>
    );
  }

  return (
    <div className="all-decks-page-container">
      {!isModal && (
        <>
          <div className="all-deck-page-search-wrapper">
            <div className="all-deck-page-search-container">
              <SearchAppBar filterDecks={filterDecks} value={searchTerm} />
            </div>
          </div>
          <div className="all-decks-grid-container">
            {filteredDecks.map((deck: IWordDeck) => {
              return (
                <DeckCardOverview key={deck._id} deck={deck} fetchUserDecks={fetchUserDecks} />
              );
            })}
          </div>
          <NewDeckButton />
        </>
      )}
      {isModal && (
        <CreateDeckModalForm
          handleCreateNewDeck={handleCreateNewDeck}
          toggleModal={toggleModal}
          decks={decks}
        />
      )}
    </div>
  );
};

export default AllDecksPage;
