import React from "react";
import SweetAlert2 from "react-sweetalert2";
import { useNavigate } from "react-router-dom";

const SweetAlert: React.FC = () => {
  const navigate = useNavigate();
  return (
    <SweetAlert2
      show
      title="Welcome to WordWings"
      text={`Hello ${"dynamic name"}, logging you in...`}
      icon="success"
      confirmButtonText="Enter App"
      timer={6000}
      timerProgressBar
      didClose={() => {
        navigate("/app/dashboard", { replace: true }); // FIX this to be dynamic
      }}
    />
  );
};

export default SweetAlert;
