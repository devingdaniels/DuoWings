import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { VscAccount } from "react-icons/vsc";
// Redux
import { useAppSelector } from "../app/hooks";

const NavigationBar = () => {
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth.user);

  return (
    <div className="home-nav-container">
      <div className="home-nav-title" onClick={() => navigate("/home")}>
        DuoWings
      </div>
      <nav>
        <ul className="home-nav-link-container">
          <li>
            <NavLink
              to="/home"
              className="nav-link" // Add custom class name for styling
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/vocab/decks"
              className="nav-link" // Add custom class name for styling
            >
              Vocab
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/tutor"
              className="nav-link" // Add custom class name for styling
            >
              Tutor
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className="profile" onClick={() => navigate("/user-settings")}>
        <VscAccount size={30} />
        <span className="profile-user-greeting">Hi, {user?.fname}!</span>
      </div>
    </div>
  );
};

export default NavigationBar;
