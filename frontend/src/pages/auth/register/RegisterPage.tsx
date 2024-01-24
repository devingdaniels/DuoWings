import { useNavigate } from "react-router-dom";
import React from "react";
import RegisterForm from "./RegisterForm";
//! Delete this later and turn into a onboard flow
import GetUserDemographics from "./GetUserDemographics";

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <>
      <h1 className="auth-site-title" onClick={() => navigate("/")}>
        DuoWings
      </h1>
      <RegisterForm />
      <GetUserDemographics />
    </>
  );
};

export default RegisterPage;
