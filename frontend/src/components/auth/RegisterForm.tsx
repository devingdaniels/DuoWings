import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IUserRegister } from "../../interfaces";
import { SwalSuccess } from "../../utils/Sweetalert2";
import BarLoader from "react-spinners/BarLoader";
import { ToastError } from "../../utils/Toastify";
// Redux
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { register, reset } from "../../features/userAuthSlice";

const SignUpForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [userData, setUserData] = useState<IUserRegister>({
    fname: "",
    lname: "",
    email: "",
    phonenumber: "",
    password: "",
    confirmPassword: "",
  });

  const { user, isLoading, isError, isSuccess, message } = useAppSelector(
    (state) => state.auth
  );

  const handleSignUp = async (e: React.FormEvent) => {
    // Stop page reload
    e.preventDefault();
    // Redux layer will
    dispatch(register(userData));
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
        dispatch(reset());
      }, 1000);
    };
  }, [user, isError, isSuccess, message, navigate]);

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
                required
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
              <div className="auth-form-button-wrapper">
                <button className="auth-button-primary" type="submit">
                  Register
                </button>
              </div>
            )}
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
