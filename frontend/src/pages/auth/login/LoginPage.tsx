import React from "react";
import LoginInForm from "./LoginInForm";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="login-page-container">
      <h1 className="auth-site-title" onClick={() => navigate("/")}>
        DuoWings
      </h1>
      <LoginInForm />
    </div>
  );
};

export default LoginPage;
