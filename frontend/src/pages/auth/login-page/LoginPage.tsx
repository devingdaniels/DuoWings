import React from "react";
import LoginInForm from "./LoginInForm";
import { useNavigate } from "react-router-dom";
import "../authPageForms.css";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <>
      <h1 onClick={() => navigate("/")}>DuoWings</h1>
      <LoginInForm />
    </>
  );
};

export default LoginPage;
