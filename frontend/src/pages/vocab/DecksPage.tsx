import { useState } from "react";
import CreateDeck from "../../components/CreateDeck";
import Deck from "../../components/Deck";
import SearchAppBar from "./SearchBar";
import { fakeDecks } from "../vocab/fakeData";

const DecksPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="deck-page-container">
      <SearchAppBar />
      <div className="deck-grid-container">
        {fakeDecks.map((deck: any, i: number) => {
          return <Deck key={i} deck={deck} />;
        })}
      </div>

      {/* Button in the bottom-right corner */}
      <button
        className="bottom-right-button-create-deck-button"
        onClick={toggleModal}
      >
        Create Deck
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-container">
          <div className="modal-content">
            <CreateDeck />
            <button className="close-modal-button" onClick={toggleModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DecksPage;
