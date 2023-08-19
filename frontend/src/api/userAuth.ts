import { alertSuccess, alertError } from "../utils/Sweetalert2";
import { IUserLogin } from "../interfaces/UserInterfaces";
import axios from "axios";

export const login = async (userData: IUserLogin) => {
  try {
    const url = import.meta.env.VITE_BACKEND_API_AUTH + "/login";
    const response = await axios.post(url, userData, {
      withCredentials: true,
    });
    alertSuccess("Success", `Logging in ${userData.email}`);
    return { status: true, data: response.data };
  } catch (err: any) {
    // Check if the error has a response with data
    if (err.response && err.response.data) {
      alertError(err.response.data.message, "An error occurred");
    } else {
      alertSuccess("Error", "An error occurred");
    }

    return { status: false };
  }
};
