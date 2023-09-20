const Deck = ({ deck }) => {
  return (
    <>
      <div className="deck-container">
        <h6>{deck.name}</h6>
        <h6>{deck.description}</h6>
      </div>
    </>
  );
};

export default Deck;
