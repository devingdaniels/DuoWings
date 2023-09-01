import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_API_WORDS || "undefined";

export const getWords = async () => {
  try {
    const response = await axios.get(BASE_URL + "/words");
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
