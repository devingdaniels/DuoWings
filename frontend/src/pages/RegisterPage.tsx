import React from "react";
import RegisterForm from "../components/auth/RegisterForm";
import AuthLandingHeader from "../components/auth/AuthLandingHeader";

const RegisterPage: React.FC = () => {
  return (
    <>
      <AuthLandingHeader destination="/" />
      <RegisterForm />
    </>
  );
};

export default RegisterPage;
