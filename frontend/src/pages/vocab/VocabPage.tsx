import { Routes, Route } from "react-router-dom";
// Pages
import DecksPage from "./DecksPage";
import StatsPage from "./StatsPage";
// Components
import NavigationBar from "../../components/NavigationBar";
import MenuPanel from "../../components/MenuPanel";

const VocabPage = () => {
  return (
    <>
      <NavigationBar />
      <div className="vocab-page-container">
        <MenuPanel />
        <Routes>
          <Route path="/decks" element={<DecksPage />} />
          <Route path="/stats" element={<StatsPage />} />
        </Routes>
      </div>
    </>
  );
};

export default VocabPage;
