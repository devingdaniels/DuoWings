import { toast } from "react-toastify";
import { IUserLogin } from "../interfaces/UserInterfaces";
import axios from "axios";

export const login = async (userData: IUserLogin) => {
  try {
    const url = import.meta.env.VITE_BACKEND_API_AUTH + "/login";
    const response = await axios.post(url, userData, {
      withCredentials: true,
    });
    return { status: true, data: response.data };
  } catch (err: any) {
    console.log(err);
    console.error(err);

    // Check if the error has a response with data
    if (err.response && err.response.data) {
      toast.error(err.response.data.message || "An error occurred");
    } else {
      toast.error("An error occurred");
    }

    return { status: false };
  }
};
