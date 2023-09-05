import { IUserLogin } from "../interfaces";
import axios from "axios";
// Set this so that cookies are included with every API request
axios.defaults.withCredentials = true;

const BASE_URL = import.meta.env.VITE_BACKEND_API_AUTH || "undefined";

const login = async (userData: IUserLogin) => {
  try {
    const response = await axios.post(BASE_URL + "/login", userData);
    // If server returns anything but 201, catch block will execute
    // Else return:  data = {id, name, email}
    return response.data;
  } catch (err: any) {
    // Check if the error has a response with data
    if (err.response && err.response.data) {
      console.log(err.response.data);
      throw new Error(err.response.data.message);
    } else {
      throw new Error("Unknown error occured, login failed.");
    }
  }
};

const authService = {
  login,
};

export default authService;
