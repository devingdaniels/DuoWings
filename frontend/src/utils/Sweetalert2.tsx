import Swal from "sweetalert2";

const alertSuccess = (title: string, text: string) => {
  Swal.fire({
    title,
    text,
    icon: "success",
    confirmButtonText: "Ok",
  });
};

const alertError = (title: string, text?: string) => {
  Swal.fire({
    title,
    text,
    icon: "error",
    confirmButtonText: "Ok",
  });
};

const alertWarning = (title: string, text: string) => {
  Swal.fire({
    title,
    text,
    icon: "warning",
    confirmButtonText: "Ok",
  });
};

const alertInfo = (title: string, text: string) => {
  Swal.fire({
    title,
    text,
    icon: "info",
    confirmButtonText: "Ok",
  });
};

export { alertSuccess, alertError, alertWarning, alertInfo };
