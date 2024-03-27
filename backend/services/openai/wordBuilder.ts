import dotenv from "dotenv";
dotenv.config();
import OpenAI from "openai";
import { IWord } from "../../interfaces";

const NAMESPACE = "openai word builder";
const openAI = new OpenAI();

function createPrompt(word: string) {
  const prompt = `Construct a detailed JSON object for the Spanish word "${word}". Ensure the definition is concise and in English. If "${word}" is a verb, include its conjugations in the present, preterite, future, and imperfect tenses. For non-verbs, the conjugations attribute should be an empty object {}. Use complete sentences for examples, starting with a capital letter and ending with a period.

Example Format:
{
  "word": "Hacer",
  "definition": "To do, to make",
  "wordType": "Verb",
  "exampleSentence": "Yo hago mi tarea todos los días.",
  "conjugations": {
    "present": {
      "yo": "hago",
      "tu": "haces",
      ...
    },
    ...
  }
}

For the given word "${word}", fill in the following:
{
  "word": "${word}",
  "definition": "[Enter the definition in English]",
  "wordType": "[Enter 'Noun', 'Verb', 'Adjective', etc.]",
  "exampleSentence": "[Enter an example sentence using '${word}' in Spanish]",
  "conjugations": ${
    '"wordType" === "Verb"'
      ? `{
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
    }`
      : "{}"
  }
}`;
  return prompt;
}

/**
 * Builds a word object using the OpenAI API
 * @param word - The word as a string to build the object
 * @param user - The user object //!TODO: Create a TypeScript interface for the user object: onboarding learning context, etc
 * @returns A word object as a JS object
 */
const buildWord = async (word: string, user: any): Promise<IWord> => {
  try {
    const response = await openAI.chat.completions.create({
      messages: [{ role: "system", content: createPrompt(word) }],
      model: "gpt-3.5-turbo-1106", //! TODO: This should be an environment variable so premium users can use the Davinci (premium) model
      response_format: { type: "json_object" },
    });

    if (response.choices[0].message.content == null) {
      throw new Error(`${NAMESPACE}: No choices returned`);
    }
    // Deserialize the JSON object and return it
    return JSON.parse(response.choices[0].message.content);
  } catch (error) {
    console.error(NAMESPACE, error);
    throw new Error(`${NAMESPACE}: ${error}`);
  }
};

export { buildWord };
