import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import.meta.env.VITE_BACKEND_API;

interface UserData {
  email: string;
  password: string;
}

const LoginInForm: React.FC = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState<UserData>({
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const URL = `${import.meta.env.VITE_BACKEND_API}/auth/login`;
      const response = await axios.post(URL, userData);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1 className="auth-page-header" onClick={() => navigate("/")}>
        DuoWings
      </h1>
      <div className="auth-form-container">
        <div className="auth-form-wrapper">
          <form onSubmit={handleSignIn}>
            <h2>Sign In</h2>
            <div className="user-info-wrapper">
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
            </div>
            <div className="auth-form-button-wrapper">
              <button className="auth-button-primary" type="submit">
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
