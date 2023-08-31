import { Link } from "react-router-dom";
import { GiWingedArrow } from "react-icons/gi";
import axios from "axios";

const NavigationBar: React.FC = () => {
  const handleLogout = async () => {
    try {
      const URL = import.meta.env.VITE_BACKEND_API_AUTH + "/logout";
      const response = await axios.get(URL, { withCredentials: true });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <GiWingedArrow size={60} />
      <nav>
        <ul>
          <li>
            <Link to="/" onClick={handleLogout}>
              Logout
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default NavigationBar;