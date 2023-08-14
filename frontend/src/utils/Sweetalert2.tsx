import React from "react";
import SweetAlert2 from "react-sweetalert2";
import { useNavigate } from "react-router-dom";
import { SweetAlertProps } from "../interfaces/SweetAlertProps";

const SweetAlert: React.FC<SweetAlertProps> = ({ attributes }) => {
  const navigate = useNavigate();

  return (
    <SweetAlert2
      show
      title={attributes.title || ""}
      text={`Hello ${attributes.name}, logging you in...` || ""}
      icon="success"
      confirmButtonText={attributes.confirmButtonText || "Enter App"}
      timer={attributes.timer || 6000}
      timerProgressBar
      didClose={
        attributes.didClose ||
        (() => navigate(attributes.redirectPath, { replace: true }))
      }
    />
  );
};

export default SweetAlert;
