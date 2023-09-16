import { useState, useEffect } from "react";
import CreateDeck from "../../components/CreateDeck";
import Deck from "../../components/Deck";
import SearchAppBar from "./SearchBar";
import { fakeDecks } from "../vocab/fakeData";
import { MdOutlineCreateNewFolder as NewDeckIcon } from "react-icons/md";

const DecksPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = (e) => {
    e.stopPropagation(); // Prevent the click event from propagating
    setIsModalOpen(!isModalOpen);
  };

  const handleEscapeKey = (e) => {
    if (e.key === "Escape" && isModalOpen) {
      setIsModalOpen(false);
    }
  };

  useEffect(() => {
    // Add a click event listener to the document
    const handleClickOutside = (e) => {
      if (isModalOpen && e.target.closest(".modal-content") === null) {
        // If the modal is open and the click is outside the modal content, close the modal
        setIsModalOpen(false);
      }
    };

    // Attach the event listener
    document.addEventListener("keydown", handleEscapeKey);
    document.addEventListener("click", handleClickOutside);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isModalOpen]);

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
        New Deck
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
