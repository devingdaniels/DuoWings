import React, { useState } from "react";
import { Link } from "react-router-dom";

// Define the interface for user data
interface UserData {
  username: string;
  email: string;
  password: string;
  agreed: boolean;
}

const SignUpForm: React.FC = () => {
  const [userData, setUserData] = useState<UserData>({
    username: "",
    email: "",
    password: "",
    agreed: false,
  });

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    alert("Implement Sign Up");
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
      <div className="auth-form-container">
        <div className="auth-form-wrapper">
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
            </div>
            <div className="auth-form-button-wrapper">
              <button className="auth-button-primary" type="submit">
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

export default SignUpForm;
