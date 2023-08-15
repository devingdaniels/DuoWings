import { Link } from "react-router-dom";
import { FaDragon } from "react-icons/fa";
import axios from "axios";

const NavigationBar: React.FC = () => {
  const handleLogout = async () => {
    try {
      const options = {
        withCredentials: true,
      };

      const response = await axios.get(
        "http://localhost:8585/api/users/auth/logout",
        options
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <FaDragon size={60} style={{ color: "green" }} />
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
