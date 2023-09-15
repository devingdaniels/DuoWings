// import SearchAppBar from "./SearchBar";
import Deck from "../../components//Deck";
import { fakeDecks } from "../vocab/fakeData";
import SearchAppBar from "./SearchBar";

import DropdownComponent from "./DropDown";

const DecksPage = () => {
  return (
    <div className="deck-page-container">
      <div style={{ width: "max-content", display: "right" }}>
        <SearchAppBar />
        <DropdownComponent />
      </div>
      <div className="deck-grid-container">
        {fakeDecks.map((deck: any, i: number) => {
          return <Deck key={i} deck={deck} />;
        })}
      </div>
    </div>
  );
};

export default DecksPage;
