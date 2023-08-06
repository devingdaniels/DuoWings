import { Link } from "react-router-dom";
import { FaDragon } from "react-icons/fa";

const NavigationBar: React.FC = () => {
  return (
    <>
      <FaDragon size={90} style={{ color: "green" }} />
      <nav>
        <ul>
          <li>
            <Link to="/">Logout</Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default NavigationBar;
