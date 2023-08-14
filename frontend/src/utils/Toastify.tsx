import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type NotificationType = "info" | "success" | "warning" | "error";

interface NotificationProps {
  type: NotificationType;
  message: string;
  duration?: number;
}

const Notification: React.FC<NotificationProps> = ({
  type,
  message,
  duration = 3000,
}) => {
  const showToast = () => {
    switch (type) {
      case "info":
        toast.info(message, { autoClose: duration });
        break;
      case "success":
        toast.success(message, { autoClose: duration });
        break;
      case "warning":
        toast.warning(message, { autoClose: duration });
        break;
      case "error":
        toast.error(message, { autoClose: duration });
        break;
      default:
        break;
    }
  };

  React.useEffect(() => {
    showToast();
  }, []);

  return <></>; // This component doesn't render anything visible
};

export default Notification;
