import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
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
      <div className="profile" onClick={() => navigate("/user-settings")}>
        <VscAccount size={40} />
        <span>Hi, {user?.fname}!</span>
      </div>
    </div>
  );
};

export default NavigationBar;
