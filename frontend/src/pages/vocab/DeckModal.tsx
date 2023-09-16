import React from "react";
import CreateDeck from "../../components/CreateDeck";

interface DeckModalProps {
  isModalOpen: boolean;
  toggleModal: () => void;
}

const DeckModal: React.FC<DeckModalProps> = ({ isModalOpen, toggleModal }) => {
  return (
    isModalOpen && (
      <div className="modal-container">
        <div className="modal-content">
          <CreateDeck />
          <button className="close-modal-button" onClick={toggleModal}>
            Close
          </button>
        </div>
      </div>
    )
  );
};

export default DeckModal;
