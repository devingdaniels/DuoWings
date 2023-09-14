// import SearchAppBar from "./SearchBar";

const decksData = [
  // { id: 1, name: "Deck 1", description: "Description 1" },
  // { id: 2, name: "Deck 2", description: "Description 2" },
  // { id: 3, name: "Deck 3", description: "Description 3" },
  // { id: 4, name: "Deck 4", description: "Description 4" },
  // { id: 5, name: "Deck 5", description: "Description 5" },
  // { id: 6, name: "Deck 6", description: "Description 6" },
  // { id: 7, name: "Deck 7", description: "Description 7" },
  // { id: 8, name: "Deck 8", description: "Description 8" },
  // { id: 9, name: "Deck 9", description: "Description 9" },
  // { id: 10, name: "Deck 10", description: "Description 10" },
  // { id: 11, name: "Deck 11", description: "Description 11" },
  // { id: 12, name: "Deck 12", description: "Description 12" },
  // { id: 13, name: "Deck 13", description: "Description 13" },
  // { id: 14, name: "Deck 14", description: "Description 14" },
  // { id: 15, name: "Deck 15", description: "Description 15" },
  // { id: 16, name: "Deck 16", description: "Description 16" },
  // { id: 17, name: "Deck 17", description: "Description 17" },
  // { id: 18, name: "Deck 18", description: "Description 18" },
  // { id: 19, name: "Deck 19", description: "Description 19" },
  // { id: 20, name: "Deck 20", description: "Description 20" },
];

const DecksPage = () => {
  return (
    <div className="deck-page-container">
      <h2>My Decks</h2>
      {/* <SearchAppBar /> */}
      <div className="deck-grid-container">
        {decksData.map((deck) => (
          <div key={deck.id}>
            <h2>{deck.name}</h2>
            <p>{deck.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DecksPage;
