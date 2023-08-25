import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IUserRegister } from "../../interfaces";
import { register } from "../../API/userAuth";
import { SwalSuccess } from "../../utils/Sweetalert2";
import BarLoader from "react-spinners/BarLoader";
import { ToastError } from "../../utils/Toastify";
import { IUserAuthResponse } from "../../interfaces";

const SignUpForm: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [userData, setUserData] = useState<IUserRegister>({
    fname: "",
    lname: "",
    email: "",
    phonenumber: "",
    password: "",
    confirmPassword: "",
  });

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    // Display spinner
    setLoading(true);

    try {
      const registerRes: IUserAuthResponse = await register(userData);
      if (registerRes.status) {
        // Alert user of successful registration
        SwalSuccess("Success", `Welcome ${registerRes.data.name}!`);
        // Redirect user to home page
        navigate("/home");
      } else {
        ToastError(registerRes.data.message);
      }
    } catch (error) {
      console.error("Registration error:", error);
      ToastError("An error occurred during registration.");
    }
    setLoading(false);
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

  // How to clear form data when component unmounts?
  // https://stackoverflow.com/questions/53949393/how-to-clear-form-data-when-component-unmounts
  useEffect(() => {
    return () => {
      console.log("LoginInForm unmounted");
      clearFormData();
    };
  }, []);

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
                placeholder="541-222-2222"
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
            {loading ? (
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
