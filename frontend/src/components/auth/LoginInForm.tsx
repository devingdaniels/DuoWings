import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IUserLogin } from "../../interfaces/UserInterfaces";
import { login as loginUser } from "../../api/userAuth";
import { SwalSuccess } from "../../utils/Sweetalert2";
import { ToastError } from "../../utils/Toastify";

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
    // Should probably use redux to store user id and email
    // the login user controller returns:{ id: existingUser._id, useremail: existingUser.email }
    // userAuth loginUser function then returns boolean for success or failure
    const loginSuccess = await loginUser(userData);

    if (loginSuccess?.status) {
      // Alert user of successful login
      SwalSuccess("Success", `Welcome ${loginSuccess.data.name}!`);
      // Clear form data
      clearFormData();
      // Redirect user to home page
      navigate("/home");
    } else {
      console.log(loginSuccess?.data);
      ToastError(loginSuccess?.data.message);
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
                autoComplete="off"
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
