import { IUserLogin, IUserRegister } from "../interfaces";

import Axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_API_AUTH || "undefined";

const login = async (user: IUserLogin) => {
  try {
    const response = await Axios.post(BASE_URL + "/login", user);
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

const register = async (user: IUserRegister) => {
  try {
    const response = await Axios.post(BASE_URL + "/register", user);
    console.log(response);
    return response.data;
  } catch (err: any) {
    console.log(err);
    if (err.response && err.response.data) {
      throw new Error(err.response.data.message);
    } else {
      throw new Error("Unknown error occured, registration failed.");
    }
  }
};

const logout = async () => {
  try {
    const response = await Axios.get(BASE_URL + "/logout");
    return response.data;
  } catch (err: any) {
    if (err.response && err.response.data) {
      throw new Error(err.response.data.message);
    } else {
      throw new Error("Unknown error occured, logout failed.");
    }
  }
};

const authService = {
  login,
  register,
  logout,
};

export default authService;
