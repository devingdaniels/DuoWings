import { Link } from "react-router-dom";

const NavigationBar: React.FC = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Logout</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavigationBar;
