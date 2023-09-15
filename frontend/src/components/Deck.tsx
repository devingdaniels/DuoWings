const Deck = ({ deck }) => {
  return (
    <>
      <div key={deck.id}>
        <h2>{deck.name}</h2>
        <p>{deck.description}</p>
      </div>
    </>
  );
};

export default Deck;
