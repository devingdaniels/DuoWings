import React from "react";
import LoginInForm from "./LoginInForm";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <>
      <h1
        className="auth-page-header duowings-site-title"
        onClick={() => navigate("/")}
      >
        DuoWings
      </h1>
      <LoginInForm />
    </>
  );
};

export default LoginPage;
