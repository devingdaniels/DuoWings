import dotenv from "dotenv";
import { buildWord } from "./wordBuilder";
dotenv.config();

const openAIService = {
  buildWord,
};

export { openAIService };
