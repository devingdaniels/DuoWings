import { Routes, Route, NavLink } from "react-router-dom";
import NavigationBar from "../../components/home-nav-bar/NavigationBar";
import DecksPage from "./DecksPage";
import StatsPage from "./StatsPage";
import "./vocabPage.css";

const VocabPage = () => {
  return (
    <>
      <NavigationBar />
      <div className="vocab-page-container">
        <div className="vocab-page-nav-panel-container">
          <div className="vocab-menu-container">
            <div className="vocab-nav-link">
              <NavLink to="/vocab/decks">Decks</NavLink>
            </div>
            <div className="vocab-nav-link">
              <NavLink to="/vocab/stats">Stats</NavLink>
            </div>
          </div>
        </div>
        <div className="vocab-page-main-section">
          <Routes>
            <Route path="/decks" element={<DecksPage />} />
            <Route path="/stats" element={<StatsPage />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default VocabPage;
