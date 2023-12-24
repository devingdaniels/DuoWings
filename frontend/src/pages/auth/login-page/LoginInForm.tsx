import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IUserLogin } from "../../../interfaces";
import { SwalSuccess } from "../../../utils/SweetAlertModule";
import BarLoader from "react-spinners/BarLoader";
import Button from "@mui/material/Button";
// Redux
import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import { login, resetUserStatus } from "../../../features/userAuthSlice";
import { ToastError } from "../../../utils/Toastify";

const LoginInForm: React.FC = () => {
  // Hooks
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  // Redux state
  const { user, isLoading, isError, isSuccess, message } = useAppSelector(
    (state) => state.auth
  );
  // Component state
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

  const handleLogin = (e: React.FormEvent) => {
    // Stop page reload
    e.preventDefault();
    // Dispatch login action
    dispatch(login(userData));
  };

  useEffect(() => {
    if (isSuccess && user) {
      SwalSuccess("Success", `Welcome ${user.fname}!`);
      navigate("/home");
    }

    if (isError) {
      ToastError(message);
    }

    return () => {
      // the timeout is needed because the resetUserStatus() action is dispatched too quickly and user
      // wont be able to see loading spinner
      setTimeout(() => {
        dispatch(resetUserStatus());
      }, 1000);
    };
  }, [user, isSuccess, isError, isLoading, message, navigate, dispatch]);

  const spinnerStyle = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };

  return (
    <>
      <div className="auth-form-container">
        <div className="auth-form-wrapper">
          <form onSubmit={handleLogin}>
            <h2>Login</h2>
            <div className="user-info-wrapper">
              <input
                className="email"
                type="text"
                placeholder="email or username"
                name="email"
                value={userData.email}
                onChange={handleInputChange}
                required
              />
              <br />
              <input
                className="password"
                type="password"
                placeholder="password"
                name="password"
                value={userData.password}
                onChange={handleInputChange}
                autoComplete="off"
                required
              />
            </div>
            {isLoading ? (
              <BarLoader
                color="#fa0000"
                cssOverride={spinnerStyle}
                aria-label="Loading Spinner"
              />
            ) : (
              <div className="auth-form-button-wrapper">
                <Button type="submit" variant="contained">
                  Sign In
                </Button>
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
