import React, { useState } from "react";
import SweetAlert2 from "react-sweetalert2";

const SweetAlert: React.FC = () => {
  const [swalProps, setSwalProps] = useState({});
  return (
    <>
      <p>line spacing</p>
      <button
        onClick={() => {
          setSwalProps({
            show: true,
            title: "Welcome to WordWings",
            text: "Login successful!",
            icon: "success",
            confirmButtonText: "Enter App",
          });
        }}
      >
        Notify
      </button>
      <SweetAlert2
        {...swalProps}
        didClose={() => {
          setSwalProps({
            show: false,
            title: "Welcome to WordWings",
            text: "Login successful!",
            icon: "success",
          });
        }}
      />
    </>
  );
};

export default SweetAlert;
