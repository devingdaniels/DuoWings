import { alertSuccess } from "../utils/Sweetalert2";
import { IUserLogin } from "../interfaces/UserInterfaces";
import axios from "axios";
import { toast } from "react-toastify";
// Set this so that cookies are included with every API request
// axios.defaults.withCredentials = true;

export const login = async (userData: IUserLogin) => {
  try {
    const url = import.meta.env.VITE_BACKEND_API_AUTH + "/login";
    const response = await axios.post(url, userData);
    alertSuccess("Success", `Welcome ${userData.email}`);

    return { status: true, data: response.data };
  } catch (err: any) {
    // Check if the error has a response with data
    if (err.response && err.response.data) {
      console.log(err.response.data);
      toast.error(err.response.data.message);
    }

    return { message: err.response.data.message };
  }
};

export const register = async (userData: IUserLogin) => {
  try {
    const url = import.meta.env.VITE_BACKEND_API_AUTH + "/register";
    const response = await axios.post(url, userData, { withCredentials: true });
  } catch (error) {}
};
