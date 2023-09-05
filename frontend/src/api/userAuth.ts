import axios from "axios";
// Set this so that cookies are included with every API request
axios.defaults.withCredentials = true;

const BASE_URL = import.meta.env.VITE_BACKEND_API_AUTH || "undefined";
if (BASE_URL === "undefined") {
  throw new Error("frontend/src/api/userAuth: BASE_URL is undefined.");
}

export const register = async (userData: IUserRegister) => {
  try {
    const res = await axios.post(BASE_URL + "/register", userData);
    return { status: true, data: res.data };
  } catch (err: any) {
    // Check if the error has a response with data
    if (err.response && err.response.data) {
      return { status: false, data: err.response.data };
    }
  }
  // If the error does not have a response with data, return generic error message
  return {
    status: false,
    data: "Unknown error occured, register failed.",
  };
};
