import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { alertSuccess } from "../../utils/Sweetalert2";
import { IUserLogin } from "../../interfaces/UserInterfaces";
import { login as loginUser } from "../../api/userAuth";

import.meta.env.VITE_BACKEND_API;

const LoginInForm: React.FC = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<IUserLogin>({
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
    const isLoginSucessful = await loginUser(userData);
    if (isLoginSucessful.status) {
      alertSuccess("Success", isLoginSucessful.data.message);
      // Show SweetAlert which will redirect to /home
      clearFormData();
      setTimeout(() => {
        navigate("/home");
      }, 2000);
    } else {
      toast.error(isLoginSucessful.data.message);
    }
  };

  const clearFormData = () => {
    setUserData({
      email: "",
      password: "",
    });
  };

  return (
    <>
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
