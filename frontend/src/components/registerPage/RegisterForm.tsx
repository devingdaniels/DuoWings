import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const RegisterForm: React.FC = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    agreed: false,
  });

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    alert("Sign Up");
    // Perform sign-up logic using userData
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === "checkbox" ? checked : value;

    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: inputValue,
    }));
  };

  return (
    <>
      <h1 className="sign-in-page-header" onClick={() => navigate("/")}>
        DuoWings
      </h1>
      <div className="login-form-container">
        <div className="login-form-wrapper">
          <form onSubmit={handleSignUp}>
            <h2>Sign Up</h2>
            <div className="user-info-wrapper">
              <input
                className="username"
                type="text"
                placeholder="Username"
                name="username"
                value={userData.username}
                onChange={handleInputChange}
              />
              <br />
              <input
                className="email"
                type="email"
                placeholder="Email or phone number"
                name="email"
                value={userData.email}
                onChange={handleInputChange}
              />
              <br />
              <input
                className="password"
                type="password"
                placeholder="Password"
                name="password"
                value={userData.password}
                onChange={handleInputChange}
              />
              <br />
              <label>
                <input
                  className="agreed"
                  type="checkbox"
                  name="agreed"
                  checked={userData.agreed}
                  onChange={handleInputChange}
                />
                I agree to the terms and conditions
              </label>
            </div>
            <div className="login-form-button-wrapper">
              <button className="signup-button-primary" type="submit">
                Sign Up
              </button>
            </div>
          </form>
        </div>
        <div className="signup-wrapper">
          <p>Already have an account?</p>
          <Link to="/login">Sign In</Link>
        </div>
      </div>
    </>
  );
};

export default RegisterForm;
