import Swal from "sweetalert2";

const SwalSuccess = (title: string, text: string) => {
  Swal.fire({
    title,
    text,
    timer: 2000,
    icon: "success",
    confirmButtonText: "Ok",
  });
};

const SwalError = (title: string, text?: string) => {
  Swal.fire({
    title,
    text,
    icon: "error",
    confirmButtonText: "Ok",
  });
};

const SwalWarning = (title: string, text: string) => {
  Swal.fire({
    title,
    text,
    icon: "warning",
    confirmButtonText: "Ok",
  });
};

const SwalInfo = (title: string, text: string) => {
  Swal.fire({
    title,
    text,
    icon: "info",
    confirmButtonText: "Ok",
  });
};

export { SwalSuccess, SwalError, SwalWarning, SwalInfo };
