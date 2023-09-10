import React from "react";
import RegisterForm from "./RegisterForm";
import AuthLandingHeader from "./AuthLandingHeader";

const RegisterPage: React.FC = () => {
  return (
    <>
      <AuthLandingHeader destination="/" />
      <RegisterForm />
    </>
  );
};

export default RegisterPage;
