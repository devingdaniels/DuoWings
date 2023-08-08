import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const LoginInForm: React.FC = () => {
  const navigate = useNavigate();
  return (
    <>
      <h1 className="sign-in-page-header" onClick={() => navigate("/")}>
        DuoWings
      </h1>
      <div className="login-form-container">
        <div className="login-form-wrapper">
          <form>
            <h2>Sign In</h2>
            <div className="user-info-wrapper">
              <input
                className="email"
                type="email"
                placeholder="Email or phone number"
              />
              <br />
              <input
                className="password"
                type="password"
                placeholder="Password"
              />
            </div>
            <div className="login-form-button-wrapper">
              <button className="login-button-primary" type="submit">
                Sign In
              </button>
            </div>
          </form>
        </div>
        <div className="signup-wrapper">
          <p>New to DuoWings?</p>
          <Link to="/register">Sign Up Now</Link>
        </div>
      </div>
    </>
  );
};

export default LoginInForm;
