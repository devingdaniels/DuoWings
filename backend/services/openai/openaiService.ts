import dotenv from "dotenv";
import OpenAI from "openai";
dotenv.config();

const NAMESPACE = "openai service";
const openAI = new OpenAI();
// const KEY = process.env.OPENAI_API_KEY;
// const URL = process.env.OPENAI_API_URL || "";

// Returns a stringified JSON object
const buildWord = async (word: string): Promise<string> => {
  // Prompt string
  const prompt = `Given the word "${word}", complete the following object with appropriate values in Spanish and return a JSON object. Provide only the specific category information requested without additional explanations or examples in other languages.\n\n:   \n\n:
  {
    word: "${word}",
    definition: [definition of the word],
    wordType: [type of word],
    exampleSentence: [1 example sentence using the word],
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
    const response = await openAI.chat.completions.create({
      messages: [{ role: "system", content: prompt }],
      model: "gpt-3.5-turbo-1106",
      response_format: { type: "json_object" },
    });

    if (response.choices[0].message.content == null) {
      throw new Error(`${NAMESPACE}: No choices returned`);
    }

    return JSON.parse(response.choices[0].message.content);
  } catch (error) {
    console.error(error);
    throw new Error(`${NAMESPACE}: ${error}`);
  }
};

const openAIService = {
  buildWord,
};

export { openAIService };
