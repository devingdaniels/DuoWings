import { IWordDeck } from "../../interfaces/index";

const Deck = ({ deck }: { deck: IWordDeck }) => {
  return (
    <>
      <div className="deck-container">
        <h6>Name: {deck.name}</h6>
        <h6>Description: {deck.description}</h6>
        <h6>Tags: {deck.tags?.join(", ")}</h6>
        <h6>Creation Date: {new Date(deck.creationDate).toLocaleDateString()}</h6>
        <h6>Last Studied: {new Date(deck.lastStudied).toLocaleDateString()}</h6>
        <h6>Experience Points: {deck.experiencePoints}</h6>
        <h6>Level: {deck.level}</h6>
        <h6>Streak: {deck.streak}</h6>
        {/* Add more fields as needed */}
      </div>
    </>
  );
};

export default Deck;
