import axios from "axios";
import { ICreateNewVocabWord } from "../interfaces/index";

const createWord = async (word: ICreateNewVocabWord) => {
  const URL = import.meta.env.VITE_BACKEND_API_WORD + "/create-word";
  try {
    const response = await axios.post(URL, word);
    // Backend returns 201 and the new word
    console.log("wordService:", response.data);
    return response.data;
  } catch (err: any) {
    if (err.response && err.response.data) {
      console.error(err.response.data.message);
      throw new Error(err.response.data.message);
    } else {
      console.error("Error:", err);
      throw new Error(`Failed to create word.`);
    }
  }
};

const wordService = {
  createWord,
};

export default wordService;
