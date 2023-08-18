import { Link } from "react-router-dom";
import { FaDragon } from "react-icons/fa";
import axios from "axios";
import { useEffect } from "react";

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

  const authenticateUser = async () => {
    try {
      const URL = import.meta.env.VITE_BACKEND_API_AUTH + "/authenticate";
      const response = await axios.get(URL, { withCredentials: true }); // send browser cookies to backend
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    authenticateUser();
  });

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
