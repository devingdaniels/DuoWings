import { useNavigate } from "react-router-dom";
import React from "react";
import RegisterForm from "./RegisterForm";
import GetUserDemographics from "./GetUserDemographics"; //! Delete this later and turn into a onboard flow

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="register-page-container">
      <h1 className="auth-site-title" onClick={() => navigate("/")}>
        DuoWings
      </h1>
      <RegisterForm />
      <GetUserDemographics />
    </div>
  );
};

export default RegisterPage;
