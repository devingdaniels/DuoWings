import dotenv from "dotenv";
import { buildWord } from "./vocabGenerator";
dotenv.config();

const openAIService = {
  buildWord,
};

export { openAIService };
