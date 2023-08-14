import React from "react";
import SweetAlert2 from "react-sweetalert2";
import { useNavigate } from "react-router-dom";

const SweetAlert: React.FC<SweetAlertProps> = ({ attributes }) => {
  const { name, redirectPath } = attributes;
  const navigate = useNavigate();

  const {
    title = "Welcome to WordWings",
    timer = 6000,
    confirmButtonText = "Enter App",
    didClose = () => {
      navigate(redirectPath, { replace: true });
    },
  } = attributes;

  return (
    <SweetAlert2
      show
      title={title}
      text={`Hello ${name}, logging you in...`}
      icon="success"
      confirmButtonText={confirmButtonText}
      timer={timer}
      timerProgressBar
      didClose={didClose}
    />
  );
};

export default SweetAlert;
