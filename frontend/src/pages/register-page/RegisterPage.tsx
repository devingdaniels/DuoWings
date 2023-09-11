import React from "react";
import RegisterForm from "./RegisterForm";
import { useNavigate } from "react-router-dom";

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <>
      <h1 onClick={() => navigate("/")}>DuoWings</h1>
      <RegisterForm />
    </>
  );
};

export default RegisterPage;
