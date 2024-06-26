import { Routes, Route, Outlet } from "react-router-dom";
import AllDecksPage from "../vocab/deck/AllDecksPage";
import StatsPage from "../vocab/stats/StatsPage";
import NavigationBar from "../../components/NavigationBar";
import MenuPanel from "../../components/MenuPanel";
import DeckPage from "../vocab/deck/DeckPage";
import UploadWordsPage from "./deck/UploadWords";
import FlashCardsPage from "./flashcards/FlashCardsPage";

const VocabPage = () => {
  return (
    <>
      <NavigationBar />
      <div className="vocab-page-container">
        <MenuPanel />
        <Routes>
          <Route path="/decks/*" element={<AllDecksPage />} />
          <Route path="/decks/:deckId" element={<DeckPage />} />
          <Route path="/decks/:deckID/upload-words" element={<UploadWordsPage />} />
          <Route path="/decks/:deckID/flashcards" element={<FlashCardsPage />} />
          <Route path="/stats" element={<StatsPage />} />
        </Routes>
        <Outlet />
      </div>
    </>
  );
};

export default VocabPage;
