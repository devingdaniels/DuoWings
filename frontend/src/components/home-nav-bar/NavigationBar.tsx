import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { VscAccount } from "react-icons/vsc";
import "./NavigationBar.css";

const NavigationBar = () => {
  const navigate = useNavigate();

  return (
    <div className="navbar">
      <div className="duowings-nav-title" onClick={() => navigate("/home")}>
        DuoWings
      </div>
      <nav>
        <ul>
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/vocab">Vocab</Link>
          </li>
          <li>
            <Link to="/tutor">Tutor</Link>
          </li>
        </ul>
      </nav>
      <div className="profile">
        <VscAccount size={40} onClick={() => navigate("/user-settings")} />
      </div>
    </div>
  );
};

export default NavigationBar;
