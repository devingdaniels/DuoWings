import "./App.css";
import HomePage from "./pages/home-page/HomePage";
import LandingPage from "./pages/landing-page/LandingPage";
import LoginPage from "./pages/auth/login/LoginPage";
import PageNotFound from "./pages/NotFoundPage";
import RegisterPage from "./pages/auth/register/RegisterPage";
import { Route, Routes } from "react-router-dom";
import { selectUser } from "./features/userAuthSlice";
import TutorPage from "./pages/tutor/TutorPage";
import { ToastContainer } from "react-toastify";
import { useAppSelector } from "./app/hooks";
import UserSettingsPage from "./pages/user-settings/UserSettingsPage";
import VocabPage from "./pages/vocab/VocabPage";
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
        <Route path="/tutor" element={user ? <TutorPage /> : <TutorPage />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={true}
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
