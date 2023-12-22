import { AiOutlinePlus } from "react-icons/ai";
import CreateDeckModalForm from "./CreateDeckModal";
import DeckCardOverview from "./DeckCardOverview";
import { FaCreativeCommonsZero } from "react-icons/fa";
import { ICreateNewDeck, IWordDeck } from "../../../interfaces/index";
import React from "react";
import SearchAppBar from "./DeckSearchBar";
import Spinner from "../../../utils/Spinner";
import { ToastError } from "../../../utils/Toastify";
import { useAppDispatch } from "../../../app/hooks";
import { useAppSelector } from "../../../app/hooks";
import { useEffect } from "react";
import { useState } from "react";
import { VocabSliceService } from "../../../features/vocabSlice";

const AllDecksPage: React.FC = () => {
  // Redux functions and state
  const dispatch = useAppDispatch();
  const { decks, isSuccess, isLoading, isError, message } = useAppSelector(
    (state) => state.vocab
  );
  // AllDecksPage state
  const [deckData, setDeckData] = useState<IWordDeck[]>(decks || []);
  const [filteredDecks, setFilteredDecks] = useState<IWordDeck[]>(
    deckData || []
  );
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isModal, setIsModal] = useState<boolean>(false);

  // Get latest user decks on component mount and when decks change
  useEffect(() => {
    const fetchDecks = async () => {
      if (decks.length === 0 && !isLoading && !isError) {
        await dispatch(VocabSliceService.fetchAllUserDecks());
      }
    };
    fetchDecks();
  }, [dispatch, decks.length, isLoading, isError]); // Removed 'dispatch' to avoid re-triggering due to dispatch function changes

  useEffect(() => {
    // This effect is for resetting deck status, separate from fetching decks
    dispatch(VocabSliceService.resetDeckStatus());
    dispatch(VocabSliceService.resetCurrentDeck());
  }, [dispatch, decks]); // Depends on 'decks', triggers when decks are updated

  // If decks change, update state
  useEffect(() => {
    setDeckData(decks);
    setFilteredDecks(decks);
  }, [decks, isSuccess]);

  // Modal handlers and event listeners
  const toggleModal = (val: boolean) => {
    setIsModal(val);
  };

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
    setIsModal(false);
    // Dispatch creation of new deck, should set loading to true
    await dispatch(VocabSliceService.createDeck(deck));
    // Reset deck loading states
    dispatch(VocabSliceService.resetDeckStatus());
    // Get updated decks
    await dispatch(VocabSliceService.fetchAllUserDecks());
  };

  const fetchUserDecks = () => {
    dispatch(VocabSliceService.fetchAllUserDecks());
  };

  const NewDeckButton = () => {
    return (
      <AiOutlinePlus
        className="add-new-deck-button"
        size={80}
        style={{ color: "red" }}
        onClick={() => {
          setIsModal(true);
        }}
      ></AiOutlinePlus>
    );
  };

  if (isError) {
    ToastError(message);
  }

  if (isLoading) {
    return (
      <div className="all-decks-page-container">
        <Spinner />
      </div>
    );
  }

  // No decks and no state-changing functionality in progress
  if (decks.length === 0 && !isModal && !isLoading) {
    return (
      <div className="all-decks-page-container-empty">
        <h2>No Decks :(</h2>
        <FaCreativeCommonsZero size={45} />
        <NewDeckButton />
      </div>
    );
  }

  // Primary JSX return
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
      {isModal && (
        <CreateDeckModalForm
          isModal={isModal}
          handleCreateNewDeck={handleCreateNewDeck}
          toggleModal={toggleModal}
          decks={deckData}
        />
      )}
    </div>
  );
};

export default AllDecksPage;
