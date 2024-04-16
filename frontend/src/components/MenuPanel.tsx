import { NavLink } from "react-router-dom";
import { BsStack } from "react-icons/bs";
import { FcBarChart } from "react-icons/fc";

const MenuPanel: React.FC = () => {
  return (
    <div className="menu-panel-container">
      <div className="menu-item-wrapper">
        <NavLink to="/vocab/decks" className={({ isActive }) => (isActive ? "active" : "")}>
          <div className="menu-panel-item">
            <BsStack color="purple" size={25} />
            <h4 className="item-title">Decks</h4>
          </div>
        </NavLink>
      </div>
      <div className="menu-item-wrapper">
        <NavLink to="/vocab/stats" className={({ isActive }) => (isActive ? "active" : "")}>
          <div className="menu-panel-item">
            <FcBarChart size={25} />
            <h4 className="item-title">Stats</h4>
          </div>
        </NavLink>
      </div>
    </div>
  );
};

export default MenuPanel;
