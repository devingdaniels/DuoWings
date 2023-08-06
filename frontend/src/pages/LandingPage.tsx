import React from "react";
import { Link } from "react-router-dom";
import SweetAlert from "../utils/sweetalert2";

const LandingPage: React.FC = () => {
  return (
    <header>
      <h1>Welcome to DuoWings!</h1>
      <Link to="/login">
        <button>Login</button>
      </Link>
      <Link to="/register">
        <button>Register</button>
      </Link>
      <SweetAlert></SweetAlert>
    </header>
  );
};

export default LandingPage;
