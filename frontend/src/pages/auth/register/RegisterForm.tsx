import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IUserRegister } from "../../../interfaces";
import { SwalSuccess } from "../../../utils/SweetAlertModule";
import BarLoader from "react-spinners/BarLoader";
import { ToastError } from "../../../utils/Toastify";
import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import { register, resetUserStatus } from "../../../features/userAuthSlice";
import Button from "@mui/material/Button";

const SignUpForm = () => {
  // Hooks
  const navigate = useNavigate();

  // Redux
  const dispatch = useAppDispatch();
  const { user, isLoading, isError, isSuccess, message } = useAppSelector((state) => state.auth);

  // Component state
  const [userData, setUserData] = useState<IUserRegister>({
    fname: "",
    lname: "",
    email: "",
    username: "",
    phonenumber: "",
    password: "",
    confirmPassword: "",
  });

  // Component methods
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    // Ensure username does not include spaces or @
    if (userData.username.includes(" ") || userData.username.includes("@")) {
      ToastError("Username cannot include spaces or @");
      return;
    }
    await dispatch(register(userData));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  const clearFormData = () => {
    setUserData({
      fname: "",
      lname: "",
      email: "",
      username: "",
      phonenumber: "",
      password: "",
      confirmPassword: "",
    });
  };

  useEffect(() => {
    if (isSuccess && user) {
      SwalSuccess("Success", `Welcome ${user.fname}!`);
      clearFormData();
      navigate("/home");
    }
    if (isError) {
      ToastError(message);
    }
    return () => {
      // Without the timeout, isLoading is set to false too fast to be seen by user
      setTimeout(() => {
        dispatch(resetUserStatus());
      }, 1000);
    };
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const spinnerStyle = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };

  return (
    <>
      <div className="auth-form-container">
        <div className="auth-form-wrapper">
          <form onSubmit={handleSignUp}>
            <h2>Sign Up</h2>
            <div className="user-info-wrapper">
              <input
                className="fname"
                name="fname"
                value={userData.fname}
                type="text"
                placeholder="First Name"
                onChange={handleInputChange}
                required
              />
              <br />
              <input
                className="lname"
                type="text"
                placeholder="Last Name"
                name="lname"
                value={userData.lname}
                onChange={handleInputChange}
                required
              />
              <br />
              <input
                className="username"
                type="username"
                placeholder="Username"
                name="username"
                value={userData.username}
                onChange={handleInputChange}
                required
              />
              <input
                className="email"
                type="email"
                placeholder="Email"
                name="email"
                value={userData.email}
                onChange={handleInputChange}
                required
              />
              <input
                className="phonenumber"
                type="text"
                placeholder="Phone number"
                name="phonenumber"
                value={userData.phonenumber}
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
                required
              />
              <br />
              <input
                className="password"
                type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
                value={userData.confirmPassword}
                onChange={handleInputChange}
                required
              />
              <br />
            </div>
            {isLoading ? (
              <BarLoader color="#fa0000" cssOverride={spinnerStyle} />
            ) : (
              <Button type="submit" variant="contained">
                Register
              </Button>
            )}
          </form>
        </div>
        <div className="signup-wrapper">
          <p>Already have an account?</p>
          <Link to="/login">Login</Link>
        </div>
      </div>
    </>
  );
};

export default SignUpForm;
