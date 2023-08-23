import { IUserLogin, IUserRegister } from "../interfaces/UserInterfaces";
import axios from "axios";
// Set this so that cookies are included with every API request
axios.defaults.withCredentials = true;

const BASE_URL = import.meta.env.VITE_BACKEND_API_AUTH || "undefined";
if (BASE_URL === "undefined") {
  throw new Error("frontend/src/api/userAuth: BASE_URL is undefined.");
}

export const login = async (userData: IUserLogin) => {
  try {
    const res = await axios.post(BASE_URL + "/login", userData);
    // If server returns anything but 201, catch block will execute
    // Else return data = {id, name, email}
    return { status: true, data: res.data };
  } catch (err: any) {
    // Check if the error has a response with data
    if (err.response && err.response.data) {
      console.log(err.response.data);
      return { status: false, data: err.response.data };
    }
  }
};

export const register = async (userData: IUserRegister) => {
  try {
    const url = BASE_URL + "/register";
    const response = await axios.post(url, userData);
    return response.data;
  } catch (error) {}
};
