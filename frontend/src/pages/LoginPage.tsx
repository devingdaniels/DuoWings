import React from "react";
import LoginInForm from "../components/auth/login/LoginInForm";
import { useNavigate } from "react-router-dom";
import AuthLandingHeader from "../components/auth/AuthLandingHeader";

const LoginPage: React.FC = () => {
  return (
    <>
      <AuthLandingHeader destination="/" />
      <LoginInForm />
    </>
  );
};

export default LoginPage;
