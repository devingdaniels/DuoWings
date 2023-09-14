import { Routes, Route, NavLink } from "react-router-dom";
import NavigationBar from "../../components/home-nav-bar/NavigationBar";
import DecksPage from "./DecksPage";
import StatsPage from "./StatsPage";
import styled from "styled-components";
import { BsStack } from "react-icons/bs";
import { ImStatsBars } from "react-icons/im";

// Define your styled components
const VocabPageContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const NavPanelContainer = styled.div`
  width: 10%;
`;

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #2e2e2e;
  border-radius: 5px;
  padding: 10px;
  margin: 10px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
`;

const navLinkStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-evenly",
  width: "100%",
};

const VocabPage = () => {
  return (
    <>
      <NavigationBar />
      <VocabPageContainer className="vocab-page-container">
        <NavPanelContainer className="vocab-page-nav-panel-container">
          <MenuContainer className="vocab-menu-container">
            <NavLink
              className={({ isActive }) => (isActive ? "active" : "")}
              to="/vocab/decks"
              style={navLinkStyle}
            >
              <BsStack size={25} />
              <h4>Decks</h4>
            </NavLink>
            <NavLink
              className={({ isActive }) => (isActive ? "active" : "")}
              to="/vocab/stats"
              style={navLinkStyle}
            >
              <ImStatsBars size={25} />
              <h4>Stats</h4>
            </NavLink>
          </MenuContainer>
        </NavPanelContainer>
        <div className="vocab-page-main-section">
          <Routes>
            <Route path="/decks" element={<DecksPage />} />
            <Route path="/stats" element={<StatsPage />} />
          </Routes>
        </div>
      </VocabPageContainer>
    </>
  );
};

export default VocabPage;
