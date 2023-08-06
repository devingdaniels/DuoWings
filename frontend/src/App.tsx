import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status

  return (
    <>
      <Routes>
        <Route path="/" element={isLoggedIn ? <HomePage /> : <LoginPage />} />
      </Routes>
    </>
  );
};

export default App;
