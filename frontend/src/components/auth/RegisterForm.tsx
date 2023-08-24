import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IUserRegister } from "../../interfaces";
import { register as registerUser } from "../../API/userAuth";

const SignUpForm: React.FC = () => {
  const [userData, setUserData] = useState<IUserRegister>({
    fname: "",
    lname: "",
    email: "",
    phonenumber: "",
    password: "",
    confirmPassword: "",
  });

  const handleSignUp = async (e: React.FormEvent) => {
    // Prevents page from reloading on submit
    e.preventDefault();
    try {
      const data = await registerUser(userData);
      console.log(data);
    } catch (error) {
      console.log(error);
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
    </>
  );
};

export default SignUpForm;
