import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { VscAccount } from "react-icons/vsc";
import { useAppSelector } from "../app/hooks";
import { useLocation } from "react-router-dom";

const NavigationBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useAppSelector((state) => state.auth.user);

  const getNavLinkClass = (path: string) => {
    return location.pathname.startsWith(path) ? "active nav-link" : "nav-link";
  };

  return (
    <div className="home-nav-container">
      <div className="home-nav-title" onClick={() => navigate("/vocab/decks")}>
        DuoWings
      </div>
      <nav>
        <ul className="home-nav-link-container">
          {/* <li>
            <NavLink to="/home" className={() => getNavLinkClass("/home")}>
              Home
            </NavLink>
          </li> */}
          <li>
            <NavLink to="/vocab/decks" className={() => getNavLinkClass("/vocab/")}>
              Vocab
            </NavLink>
          </li>
          <li>
            <NavLink to="/tutor" className={() => getNavLinkClass("/tutor")}>
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
