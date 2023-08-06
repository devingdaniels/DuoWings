import React from "react";
import { Link } from "react-router-dom";

const LandingPage: React.FC = () => {
  return (
    <header>
      <h1>
        This is the landing page where there will be a nice background and two
        buttons: Login & Register
      </h1>
      <div>
        <Link to="/login">
          <button>log in</button>
        </Link>
        <Link to="/register">
          <button>
            <span>register</span>
          </button>
        </Link>
      </div>
    </header>
  );
};

export default LandingPage;
