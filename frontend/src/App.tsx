import "./App.css";
import { Routes, Route } from "react-router-dom";
// Pages
import LandingPage from "./pages/landing-page/LandingPage";
import LoginPage from "./pages/auth/login-page/LoginPage";
import RegisterPage from "./pages/auth/register-page/RegisterPage";
import HomePage from "./pages/home-page/HomePage";
import UserSettingsPage from "./pages/user-settings/UserSettingsPage";
import VocabPage from "./pages/vocab/VocabPage";
// App notifications
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/vocab" element={<VocabPage />} />
        <Route path="/user-settings" element={<UserSettingsPage />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default App;
