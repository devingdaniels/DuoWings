import React from "react";
import RegisterForm from "../components/registerPage/RegisterForm";
import { useNavigate } from "react-router-dom";

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <>
      <h1
        className="auth-page-header duowings-site-title"
        onClick={() => navigate("/")}
      >
        DuoWings
      </h1>
      <RegisterForm />
    </>
  );
};

export default RegisterPage;
