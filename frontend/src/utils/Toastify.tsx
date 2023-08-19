import { toast } from "react-toastify";

function notify(message: string) {
  return toast.warning(message);
}

export { notify };
