import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IUserLogin } from "../../interfaces";
import { SwalSuccess } from "../../utils/Sweetalert2";
import { ToastError } from "../../utils/Toastify";
import BarLoader from "react-spinners/BarLoader";
// Redux
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { login, reset } from "../../features/userAuthSlice";

const LoginInForm: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [userData, setUserData] = useState<IUserLogin>({
    email: "",
    password: "",
  });

  const { user, isLoading, isError, isSuccess, message } = useAppSelector(
    (state) => state.auth
  );

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
    // Redux layer will
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
      // Without the timeout, isLoading is set to false too fast (with good connections) to be seen by client
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
          <form onSubmit={handleLogin}>
            <h2>Login</h2>
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
            {isLoading ? (
              <BarLoader
                color="#fa0000"
                cssOverride={spinnerStyle}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            ) : (
              <div className="auth-form-button-wrapper">
                <button className="auth-button-primary" type="submit">
                  Login
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
