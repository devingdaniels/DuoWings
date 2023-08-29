import { toast } from "react-toastify";

const ToastSuccess = (message: string) => {
  toast.success(message, {
    position: "top-right",
    autoClose: 2500,
    hideProgressBar: false,
    closeOnClick: true,
    draggable: true,
  });
};

const ToastWarning = (message: string) => {
  toast.warning(message, {
    position: "top-right",
    autoClose: 2500,
    hideProgressBar: false,
    closeOnClick: true,
    draggable: true,
  });
};

const ToastInfo = (message: string) => {
  toast.info(message, {
    autoClose: 2500,
  });
};

const ToastError = (message: string) => {
  toast.error(message, {
    position: "top-right",
    autoClose: 2500,
    hideProgressBar: false,
    closeOnClick: true,
    draggable: true,
    pauseOnHover: true,
  });
};

export { ToastSuccess, ToastError, ToastWarning, ToastInfo };
