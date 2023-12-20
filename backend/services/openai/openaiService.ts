import { json } from "body-parser";
import dotenv from "dotenv";
import OpenAI from "openai";
dotenv.config();

const NAMESPACE = "openai service";
const openai = new OpenAI();
// const KEY = process.env.OPENAI_API_KEY;
// const URL = process.env.OPENAI_API_URL || "";

const fakeWordBuilder = (word: string) => {
  return {
    word: word,
    definition: "to speak",
    wordType: "verb",
    exampleSentence: "Me gusta hablar español todos los días.",
    conjugations: {
      present: {
        yo: "hablo",
        tu: "hablas",
        el: "habla",
        nosotros: "hablamos",
        vosotros: "habláis",
        ellos: "hablan",
      },
    },
    difficulty: 2,
    tags: ["language", "communication"],
    creationDate: "2023-12-19T18:35:56.002Z",
  };
};

// Returns a stringified JSON object
const buildWord = async (word: string): Promise<string> => {
  // Prompt string
  const prompt = `Given the word "${word}", complete the following object with appropriate values. For each key, ensure each word has single quotes around it. \n\n:
  {
    word: "${word}",
    definition: [definition of the word],
    wordType: [type of word],
    exampleSentence: [example sentence using the word],
    conjugations: {
        present: {
            yo: [conjugation for 'yo'],
            tu: [conjugation for 'tu'],
            el: [conjugation for 'el'],
            nosotros: [conjugation for 'nosotros'],
            vosotros: [conjugation for 'vosotros'],
            ellos: [conjugation for 'ellos'],
        },
        preterite: {
            yo: [conjugation for 'yo in preterite'],
            tu: [conjugation for 'tu in preterite'],
            el: [conjugation for 'el in preterite'],
            nosotros: [conjugation for 'nosotros in preterite'],
            vosotros: [conjugation for 'vosotros in preterite'],
            ellos: [conjugation for 'ellos in preterite'],
        },
        future: {
            yo: [conjugation for 'yo in future],
            tu: [conjugation for 'tu in future],
            el: [conjugation for 'el in future],
            nosotros: [conjugation for 'nosotros in future],
            vosotros: [conjugation for 'vosotros in future],
            ellos: [conjugation for 'ellos in future],
        },
        imperfect: {
            yo: [conjugation for 'yo in imperfect],
            tu: [conjugation for 'tu in imperfect],
            el: [conjugation for 'el in imperfect],
            nosotros: [conjugation for 'nosotros in imperfect],
            vosotros: [conjugation for 'vosotros in imperfect],
            ellos: [conjugation for 'ellos in imperfect],
        },
    },
}`;

  try {
    const response = await openai.chat.completions.create({
      messages: [{ role: "system", content: prompt }],
      model: "gpt-3.5-turbo",
    });

    if (response.choices[0].message.content == null) {
      throw new Error(`${NAMESPACE}: No choices returned`);
    }

    const word = response.choices[0].message.content;

    return word;
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
