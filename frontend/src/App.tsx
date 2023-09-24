import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/landing-page/LandingPage";
import LoginPage from "./pages/auth/login-page/LoginPage";
import RegisterPage from "./pages/auth/register-page/RegisterPage";
import HomePage from "./pages/home-page/HomePage";
import UserSettingsPage from "./pages/user-settings/UserSettingsPage";
import VocabPage from "./pages/vocab/VocabPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAppSelector } from "./app/hooks";
import { selectUser } from "./features/userAuthSlice";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const App = () => {
  const user = useAppSelector(selectUser);
  const isProtectedRoute =
    window.location.pathname.includes("/home") ||
    window.location.pathname.includes("/vocab") ||
    window.location.pathname.includes("/user-settings");

  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={user ? <Navigate to="/home" /> : <LoginPage />} />
        <Route path="/register" element={user ? <Navigate to="/home" /> : <RegisterPage />} />
        {user || !isProtectedRoute ? (
          // If user is authenticated or URL is not a protected route, show protected routes
          <>
            <Route path="/home" element={<HomePage />} />
            <Route path="/vocab/*" element={<VocabPage />} />
            <Route path="/user-settings" element={<UserSettingsPage />} />
          </>
        ) : (
          // If user is not authenticated and URL is a protected route, show a message and link to landing page
          <>
            <Route
              path="/home"
              element={
                <div>
                  <h1>Welcome to the app!</h1>
                  <p>
                    Please <Link to="/">go to the landing page</Link> to get started.
                  </p>
                </div>
              }
            />
            <Route
              path="/vocab/*"
              element={
                <div>
                  <h1>Welcome to the app!</h1>
                  <p>
                    Please <Link to="/">go to the landing page</Link> to get started.
                  </p>
                </div>
              }
            />
            <Route
              path="/user-settings"
              element={
                <div>
                  <h1>Welcome to the app!</h1>
                  <p>
                    Please <Link to="/">go to the landing page</Link> to get started.
                  </p>
                </div>
              }
            />
          </>
        )}
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
