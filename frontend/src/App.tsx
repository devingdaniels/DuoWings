import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
// Pages
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgetPasswordPage from "./pages/ForgetPasswordPage";
import HomePage from "./pages/HomePage";
// Dark Mode
// import DarkModeToggle from "./utils/DarkModeToggle";

const App: React.FC = () => {
  return (
    <>
      {/* <DarkModeToggle /> */}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forget-password" element={<ForgetPasswordPage />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </>
  );
};

export default App;
