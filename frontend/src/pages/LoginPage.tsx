import React from "react";
import LoginInForm from "../components/auth/LoginInForm";
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
