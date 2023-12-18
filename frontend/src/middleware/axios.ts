import axios from "axios";
import { logout } from "../features/userAuthSlice";
import { useAppDispatch } from "../app/hooks";

const Axios = axios.create({});

// This will send cookies with every request
Axios.defaults.withCredentials = true;

Axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const dispatch = useAppDispatch();
    console.log(error);
    const { status } = error.response;
    if (status === 401) {
      dispatch(logout());
    } else {
      // Log the error response
      console.error("Error Response:", error.response);
    }

    return Promise.reject(error);
  }
);

export { Axios };
