import React, { useState } from "react";
import SweetAlert2 from "react-sweetalert2";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    // Perform your login logic here
    // For example, you might make an API call and then set isLoggedIn to true.
    setIsLoggedIn(true);
  };

  return (
    <>
      {isLoggedIn ? (
        <SweetAlert2
          show
          title="Welcome to WordWings"
          text={`Hello ${"dynamic name"}, logging you in...`}
          icon="success"
          confirmButtonText="Enter App"
          timer={6000}
          timerProgressBar
          didClose={() => {
            navigate("/home");
          }}
        />
      ) : (
        <button onClick={handleLogin}>Log In</button>
      )}
    </>
  );
};

export default Login;
