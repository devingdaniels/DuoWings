import axios from "axios";
import dotenv from "dotenv";
import OpenAI from "openai";
dotenv.config();

const KEY = process.env.OPENAI_API_KEY;
const URL = process.env.OPENAI_API_URL || "";
const NAMESPACE = "openai service";
const openai = new OpenAI();

const buildWord = async (word: string) => {
  const prompt = `Using the provided word, create up an object with the following key:value pairs:
        object: {
            word: ${word},
            definition: '',
            wordType: '',
            exampleSentence: '',
            conjugations: {
              present: {
                yo: '',
                tu: '',
                el: '',
                nosotros: '',
                vosotros: '',
                ellos: '',
              },
            },
            difficulty: default to 0,
            tags: [],
            creationDate: new Date().now,
          }
        word: ${word},
    
    `;
  const options = {
    method: "POST",
    url: URL,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${KEY}`,
    },
    data: {
      prompt: prompt,
      max_tokens: 150,
    },
  };
  console.log("Backend: Options:", options);
  try {
    const response = await openai.chat.completions.create({
      messages: [{ role: "system", content: prompt }],
      model: "gpt-3.5-turbo",
    });
    console.log(response.choices);
  } catch (error) {
    console.error(error);
    throw new Error(`${NAMESPACE}: ${error}`);
  }
};

const openAIService = {
  buildWord,
};

export { openAIService };
