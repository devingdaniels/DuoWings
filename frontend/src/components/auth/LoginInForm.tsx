import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IUserLogin, ILoginResponse } from "../../interfaces";
import { login as loginUser } from "../../API/userAuth";
import { SwalSuccess } from "../../utils/Sweetalert2";
import { ToastError } from "../../utils/Toastify";
import BarLoader from "react-spinners/BarLoader";

const LoginInForm: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
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
    // Display spinner
    setLoading(true);
    // Send user data to backend
    const loginSuccess: ILoginResponse = await loginUser(userData);
    // Check if login was successful
    if (loginSuccess.status) {
      // Alert user of successful login
      SwalSuccess("Success", `Welcome ${loginSuccess.data.name}!`);
      // Clear form data
      clearFormData();
      // Redirect user to home page
      navigate("/home");
    } else {
      console.log(loginSuccess.data);
      ToastError(loginSuccess.data.message);
    }
    // Done loading
    setLoading(false);
  };

  const clearFormData = () => {
    setUserData({
      email: "",
      password: "",
    });
  };

  const spinnerStyle = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
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
                autoComplete="off"
              />
            </div>
            {loading ? (
              <BarLoader
                color="#fa0000"
                cssOverride={spinnerStyle}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            ) : (
              <div className="auth-form-button-wrapper">
                <button className="auth-button-primary" type="submit">
                  Sign In
                </button>
              </div>
            )}
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
