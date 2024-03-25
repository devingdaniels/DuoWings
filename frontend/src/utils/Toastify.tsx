import { toast } from "react-toastify";

// Time in milliseconds
const AUTO_CLOSE = 2500;

const success = (message: string) => {
  toast.success(message, {
    position: "top-right",
    autoClose: AUTO_CLOSE,
    hideProgressBar: false,
    closeOnClick: true,
    draggable: true,
  });
};

const warning = (message: string) => {
  toast.warning(message, {
    position: "top-right",
    autoClose: AUTO_CLOSE,
    hideProgressBar: false,
    closeOnClick: true,
    draggable: true,
  });
};

const info = (message: string) => {
  toast.info(message, {
    autoClose: AUTO_CLOSE,
  });
};

const error = (message: string) => {
  toast.error(message, {
    position: "top-right",
    autoClose: AUTO_CLOSE,
    hideProgressBar: false,
    closeOnClick: true,
    draggable: true,
    pauseOnHover: true,
  });
};

const toastService = {
  success,
  warning,
  info,
  error,
};

export { toastService };
