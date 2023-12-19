import dotenv from "dotenv";
import OpenAI from "openai";
dotenv.config();

const NAMESPACE = "openai service";
const openai = new OpenAI();
// const KEY = process.env.OPENAI_API_KEY;
// const URL = process.env.OPENAI_API_URL || "";

const fakeWordBuilder = (word: string, definition: string) => {
  return {
    word: "hablar",
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
const buildWord = async (word: string, definition: string): Promise<string> => {
  // Prompt string
  const prompt = `Given the word "${word}" with the definition "${definition}", complete the following object with appropriate values:
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
    },
    difficulty: [1],
    tags: [any relevant tags],
    creationDate: "${new Date().toISOString()}",
}`;

  try {
    const response = await openai.chat.completions.create({
      messages: [{ role: "system", content: prompt }],
      model: "gpt-3.5-turbo",
    });

    if (response.choices[0].message.content == null) {
      throw new Error(`${NAMESPACE}: No choices returned`);
    }

    return response.choices[0].message.content;
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
