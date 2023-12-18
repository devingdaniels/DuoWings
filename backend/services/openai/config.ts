import dotenv from "dotenv";
import OpenAI from "openai";
dotenv.config();

const NAMESPACE = "openai service";
const openai = new OpenAI();
// const KEY = process.env.OPENAI_API_KEY;
// const URL = process.env.OPENAI_API_URL || "";

const fakeWordBuilder = (word: string, definition: string) => {
  return {
    word,
    definition,
    exampleSentence: "Example sentence using the word",
    wordType: "verb",
    conjugations: {
      present: {
        yo: "I speak",
        tu: "You speak",
        el: "habla",
        nosotros: "hablamos",
        vosotros: "habláis",
        ellos: "hablan",
      },
    },
    difficulty: 0,
    tags: [],
  };
};

const buildWord = async (word: string) => {
  // Prompt string
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
  fakeWordBuilder,
};

export { openAIService };
