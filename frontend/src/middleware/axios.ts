import axios from "axios";

const Axios = axios.create({});

// This will send cookies with every request
Axios.defaults.withCredentials = true;

Axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { status } = error.response;
    if (status === 401) {
      // Dispatch action to reset Redux store slices
      console.log("401 error");
      // Perform any other actions like redirecting to the login page
    } else {
      // Log the error response
      console.error("Error Response:", error.response);
    }

    return Promise.reject(error);
  }
);

export { Axios };
