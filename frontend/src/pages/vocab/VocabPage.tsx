import { Routes, Route, Outlet } from "react-router-dom";
// Pages
import AllDecksPage from "../deck/AllDecksPage";
import StatsPage from "./StatsPage";
// Components
import NavigationBar from "../../components/NavigationBar";
import MenuPanel from "../../components/MenuPanel";
//
import DeckPage from "../deck/DeckPage";

const VocabPage = () => {
  return (
    <>
      <NavigationBar />
      <div className="vocab-page-container">
        <MenuPanel />
        <Routes>
          <Route path="/decks/*" element={<AllDecksPage />} />
          <Route path="/decks/:deckId" element={<DeckPage />} />
          <Route path="/stats" element={<StatsPage />} />
        </Routes>
        <Outlet />
      </div>
    </>
  );
};

export default VocabPage;
