import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { VscAccount } from "react-icons/vsc";
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
            <NavLink to="/home" className="nav-link">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/vocab/decks" className="nav-link">
              Vocab
            </NavLink>
          </li>
          <li>
            <NavLink to="/tutor" className="nav-link">
              Tutor
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className="profile" onClick={() => navigate("/user-settings")}>
        <VscAccount size={30} />
        <span className="profile-user-greeting">{user && user.username}</span>
      </div>
    </div>
  );
};

export default NavigationBar;
