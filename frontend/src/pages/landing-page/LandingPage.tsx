import React from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { BsCardChecklist } from "react-icons/bs";

const LandingPage: React.FC = () => {
  return (
    <div className="landing-page">
      <header>
        <div>
          <h1>DuoWings</h1>
          <h3>Some catchphrase here</h3>
        </div>
        <Link to="/login">
          <Button variant="contained" size="large">
            Login
          </Button>
        </Link>
      </header>
      <div className="section-1">
        <div className="call-to-action">
          <h3>
            Here is some reason why you should use this product over our
            competitors and now you pay me
          </h3>
          <Link to="/register">
            <Button variant="contained" size="large">
              Register
            </Button>
          </Link>
        </div>
        <div className="call-to-action">
          <h3>
            Here will be an example vocab card has flip animation and stuff
          </h3>
          <BsCardChecklist size={80} />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
