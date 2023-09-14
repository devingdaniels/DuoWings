import { NavLink } from "react-router-dom";
// Icons
import { BsStack } from "react-icons/bs";
import { ImStatsBars } from "react-icons/im";

const MenuPanel = () => {
  return (
    <div className="menu-panel-container">
      <div className="menu-item-wrapper">
        <NavLink
          to="/vocab/decks"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <div className="menu-panel-item">
            <BsStack size={25} />
            <h4 className="item-title">Decks</h4>
          </div>
        </NavLink>
      </div>
      <div className="menu-item-wrapper">
        <NavLink
          to="/vocab/stats"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <div className="menu-panel-item">
            <ImStatsBars size={25} />
            <h4 className="item-title">Stats</h4>
          </div>
        </NavLink>
      </div>
    </div>
  );
};

export default MenuPanel;
