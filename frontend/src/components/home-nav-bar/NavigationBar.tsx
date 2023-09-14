import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { VscAccount } from "react-icons/vsc";
import "./NavigationBar.css";
// Redux
import { useAppSelector } from "../../app/hooks";

const NavigationBar = () => {
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth.user);

  return (
    <div className="navbar">
      <div className="duowings-nav-title" onClick={() => navigate("/home")}>
        DuoWings
      </div>
      <nav>
        <ul>
          <li>
            <NavLink
              to="/home"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "active" : ""
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/vocab"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "active" : ""
              }
            >
              Vocab
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/tutor"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "active" : ""
              }
            >
              Tutor
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className="profile" onClick={() => navigate("/user-settings")}>
        <VscAccount size={30} />
        <span style={{ paddingLeft: "10px" }}>Hi, {user?.fname}!</span>
      </div>
    </div>
  );
};

export default NavigationBar;
