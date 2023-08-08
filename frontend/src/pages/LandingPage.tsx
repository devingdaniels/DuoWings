import React from "react";
import { Link } from "react-router-dom";

const LandingPage: React.FC = () => {
  return (
    <div className="landing-page-container">
      <div className="landing-page-section-1">
        <header>
          <h1>DuoWings</h1>
          <nav>
            <Link to="/login">
              <button className="landing-page-login-button">Sign In</button>
            </Link>
          </nav>
        </header>
        <div className="call-to-action-container">
          <Link to="/register">
            <button className="landing-page-register-button">Sign Up</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
