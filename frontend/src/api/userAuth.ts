import { IUserLogin, IUserRegister } from "../interfaces/UserInterfaces";
import axios from "axios";
import { SwalSuccess } from "../utils/Sweetalert2";
import { ToastError } from "../utils/Toastify";
// Set this so that cookies are included with every API request
axios.defaults.withCredentials = true;

export const login = async (userData: IUserLogin) => {
  try {
    const url = import.meta.env.VITE_BACKEND_API_AUTH + "/login";
    const response = await axios.post(url, userData);
    // If server returns anything but 201, the code below will not run and the catch block will run instead
    SwalSuccess("Success", `Welcome ${userData.email}`);
    return { status: true, data: response.data };
  } catch (err: any) {
    // Check if the error has a response with data
    if (err.response && err.response.data) {
      console.log(err.response.data);
      ToastError(err.response.data.message);
    }
  }
  return { status: false, data: null };
};

export const register = async (userData: IUserRegister) => {
  try {
    const url =
      import.meta.env.VITE_BACKEND_API_AUTH + "/register" || "undefined";
    const response = await axios.post(url, userData);
    return response.data;
  } catch (error) {}
};
