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
          <button>Login</button>
        </Link>
        <Link to="/register">
          <button>Register</button>
        </Link>
      </div>
    </header>
  );
};

export default LandingPage;
