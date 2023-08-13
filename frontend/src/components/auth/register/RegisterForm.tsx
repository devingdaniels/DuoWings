import React, { useState } from "react";
import { Link } from "react-router-dom";

// Define the interface for user data
interface UserData {
  fname: string;
  lname: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreed: boolean;
}

const SignUpForm: React.FC = () => {
  const [userData, setUserData] = useState<UserData>({
    fname: "",
    lname: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreed: false,
  });

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (userData.password !== userData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    // Perform actual sign-up logic here
    alert("Implement Sign Up");
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
              />
              <br />
              <input
                className="lname"
                type="text"
                placeholder="Last Name"
                name="lname"
                value={userData.lname}
                onChange={handleInputChange}
              />
              <br />
              <br />
              <input
                className="email"
                type="email"
                placeholder="Email"
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
              <br />
              <input
                className="password"
                type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
                value={userData.confirmPassword}
                onChange={handleInputChange}
              />
              <br />
              <div>
                <label>
                  <input
                    type="checkbox"
                    name="agreed"
                    checked={userData.agreed}
                    onChange={handleInputChange}
                  />
                  I agree to the terms and conditions
                </label>
              </div>
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
