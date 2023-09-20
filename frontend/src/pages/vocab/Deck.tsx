import { INewVocabDeck } from "../../interfaces/index";

const Deck: React.FC<INewVocabDeck> = ({ name, description }) => {
  return (
    <>
      <div className="deck-container" key={name}>
        <h6>{name}</h6>
        <h6>{description}</h6>
      </div>
    </>
  );
};

export default Deck;
