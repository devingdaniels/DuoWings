import { IUserLogin, IUserRegister } from "../interfaces";
import axios from "axios";
// Set this so that cookies are included with every API request
axios.defaults.withCredentials = true;

const BASE_URL = import.meta.env.VITE_BACKEND_API_AUTH || "undefined";

const login = async (userData: IUserLogin) => {
  try {
    const response = await axios.post(BASE_URL + "/login", userData);
    // If server returns anything but 201, catch block will execute
    return response.data;
  } catch (err: any) {
    if (err.response && err.response.data) {
      throw new Error(err.response.data.message);
    } else {
      throw new Error("Unknown error occured, login failed.");
    }
  }
};

const register = async (userData: IUserRegister) => {
  try {
    const response = await axios.post(BASE_URL + "/register", userData);
    return response.data;
  } catch (err: any) {
    if (err.response && err.response.data) {
      throw new Error(err.response.data.message);
    } else {
      throw new Error("Unknown error occured, registration failed.");
    }
  }
};

const authService = {
  login,
  register,
};

export default authService;