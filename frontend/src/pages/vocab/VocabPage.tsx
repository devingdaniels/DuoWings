import { Routes, Route, Outlet } from "react-router-dom";
// Pages
import DecksPage from "../deck/DecksGridPage";
import StatsPage from "./StatsPage";
// Components
import NavigationBar from "../../components/NavigationBar";
import MenuPanel from "../../components/MenuPanel";
//
import DeckCardDetails from "../deck/DeckCardDetails";

const VocabPage = () => {
  return (
    <>
      <NavigationBar />
      <div className="vocab-page-container">
        <MenuPanel />
        <Routes>
          <Route path="/decks/*" element={<DecksPage />} />
          <Route path="/decks/:deckId" element={<DeckCardDetails />} />
          <Route path="/stats" element={<StatsPage />} />
        </Routes>
        <Outlet />
      </div>
    </>
  );
};

export default VocabPage;
