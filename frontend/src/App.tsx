import HomePage from "./pages/home-page/HomePage";
import LandingPage from "./pages/landing-page/LandingPage";
import LoginPage from "./pages/auth/login-page/LoginPage";
import PageNotFound from "./pages/NotFoundPage";
import RegisterPage from "./pages/auth/register-page/RegisterPage";
import { Route, Routes } from "react-router-dom";
import { selectUser } from "./features/userAuthSlice";
import { ToastContainer } from "react-toastify";
import { useAppSelector } from "./app/hooks";
import UserSettingsPage from "./pages/user-settings/UserSettingsPage";
import VocabPage from "./pages/vocab/VocabPage";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";

const DuoWingsApp = () => {
  const user = useAppSelector(selectUser);
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home" element={user ? <HomePage /> : <PageNotFound />} />
        <Route path="/vocab/*" element={user ? <VocabPage /> : <PageNotFound />} />
        <Route path="/user-settings" element={user ? <UserSettingsPage /> : <PageNotFound />} />
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
        theme="dark"
      />
    </>
  );
};

export default DuoWingsApp;
