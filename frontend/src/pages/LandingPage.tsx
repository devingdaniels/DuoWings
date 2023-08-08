import React from "react";
import { Link } from "react-router-dom";

const LandingPage: React.FC = () => {
  return (
    <div className="landing-page-header">
      <header>
        <h1>DuoWings</h1>
        <Link to="/login">
          <button>Login</button>
        </Link>
        <Link to="/register">
          <button>Register</button>
        </Link>
      </header>
      <div>content</div>
    </div>
  );
};

export default LandingPage;
