import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SweetAlert from "../../utils/Sweetalert2";
import { IUserRegister } from "../../interfaces/UserInterfaces";
import { notify } from "../../utils/Toastify";

const SignUpForm: React.FC = () => {
  const navigate = useNavigate();
  const [signupSuccess, setSignupSuccess] = useState(false);
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

    const options = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    try {
      const URL: string =
        import.meta.env.VITE_BACKEND_API_AUTH + "/register" || "undefined";
      const response = await axios.post(URL, userData, options);

      if (response.status === 201) {
        console.log(response.data);
        setSignupSuccess(true);
      } else {
        console.log(response.data);
        notify("An error occurred.");
      }
    } catch (error: any) {
      if (error.response) {
        if (error.response.status === 400) {
          if (error.response.data.errorType === "emailConflict") {
            console.log(error.response.data.message);
            notify("User with this email already exists.");
          } else if (error.response.data.errorType === "passwordMismatch") {
            console.log(error.response.data.message);
            notify("Passwords do not match.");
          }
        } else {
          console.error("An error occurred:", error.message);
        }
      } else {
        console.error("An error occurred:", error.message);
      }
    }
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
                className="fname"
                type="text"
                placeholder="First Name"
                name="fname"
                value={userData.fname}
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
      {signupSuccess && (
        <SweetAlert
          attributes={{
            name: "Welcome to DuoWings",
            redirectPath: "/login",
            title: "Success!",
            icon: "success",
            timer: 3000,
            confirmButtonText: "Continue to Login",
            didClose: () => {
              navigate("/home");
            },
          }}
        />
      )}
    </>
  );
};

export default SignUpForm;
