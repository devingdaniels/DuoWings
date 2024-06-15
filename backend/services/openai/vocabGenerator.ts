import dotenv from "dotenv";
dotenv.config();
import { IWord } from "../../interfaces";
import logging from "../../config/logging";
import OpenAI from "openai";
import textToSpeech from "@google-cloud/text-to-speech";

const NAMESPACE = "openai/wordBuilder.ts";
const DEBUGGING = true;

function createPrompt(word: string) {
  const prompt = `Construct a detailed JSON object for the Spanish word "${word}". Ensure the definition is concise and in English. If "${word}" is a verb, include its conjugations in the present, preterite, future, and imperfect tenses. For non-verbs, the conjugations attribute should be an empty object {}. Use complete sentences for examples, starting with a capital letter and ending with a period. Follow the example format provided very closely.

Example Format:
{
  "word": "Hacer",
  "definition": "To do, to make",
  "wordType": "Verb",
  "exampleSentence": "Yo hago mi tarea todos los días.",
  "phoneticSpelling": "ah-ser",
  "isIrregular": true,
  "synonyms": ["realizar", "obrar"],
  "antonyms": ["deshacer", "desmontar"],
  "conjugations": {
    "present": {
      "yo": "hago",
      "tu": "haces",
      "el": "hace",
      "nosotros": "hacemos",
      "vosotros": "hacéis",
      "ellos": "hacen"
    },
    "preterite": {
      "yo": "hice",
      "tu": "hiciste",
      "el": "hizo",
      "nosotros": "hicimos",
      "vosotros": "hicisteis",
      "ellos": "hicieron"
    },
    "future": {
      "yo": "haré",
      "tu": "harás",
      "el": "hará",
      "nosotros": "haremos",
      "vosotros": "haréis",
      "ellos": "harán"
    },
    "imperfect": {
      "yo": "hacía",
      "tu": "hacías",
      "el": "hacía",
      "nosotros": "hacíamos",
      "vosotros": "hacíais",
      "ellos": "hacían"
    }
  }
}

For the given word "${word}", fill in the following:
{
  "word": "${word}",
  "definition": "[Enter the definition in English]",
  "wordType": "[Enter 'Noun', 'Verb', 'Adjective', etc.]",
  "exampleSentence": "[Enter an example sentence using '${word}' in Spanish]",
  "phoneticSpelling": "[Provide the phonetic spelling using English phonetic cues]",
  "isIrregular": [true/false],
  "synonyms": ["[Provide 2-3 synonyms in Spanish]"],
  "antonyms": ["[Provide 2-3 antonyms in Spanish]"],
  "conjugations": ${
    "wordType === Verb"
      ? `{
    "present": {
      "yo": "[conjugation for 'yo']",
      "tu": "[conjugation for 'tu']",
      "el": "[conjugation for 'el']",
      "nosotros": "[conjugation for 'nosotros']",
      "vosotros": "[conjugation for 'vosotros']",
      "ellos": "[conjugation for 'ellos']"
    },
    "preterite": {
      "yo": "[conjugation for 'yo' in preterite]",
      "tu": "[conjugation for 'tu' in preterite]",
      "el": "[conjugation for 'el' in preterite]",
      "nosotros": "[conjugation for 'nosotros' in preterite]",
      "vosotros": "[conjugation for 'vosotros' in preterite]",
      "ellos": "[conjugation for 'ellos' in preterite]"
    },
    "future": {
      "yo": "[conjugation for 'yo' in future]",
      "tu": "[conjugation for 'tu' in future]",
      "el": "[conjugation for 'el' in future]",
      "nosotros": "[conjugation for 'nosotros' in future]",
      "vosotros": "[conjugation for 'vosotros' in future]",
      "ellos": "[conjugation for 'ellos' in future]"
    },
    "imperfect": {
      "yo": "[conjugation for 'yo' in imperfect]",
      "tu": "[conjugation for 'tu' in imperfect]",
      "el": "[conjugation for 'el' in imperfect]",
      "nosotros": "[conjugation for 'nosotros' in imperfect]",
      "vosotros": "[conjugation for 'vosotros' in imperfect]",
      "ellos": "[conjugation for 'ellos' in imperfect]"
    }
  }`
      : "{}"
  }
}`;

  // listVoices();
  return prompt;
}

/**
 * Builds a word object using the OpenAI API
 * @param word - The word as a string to build the object
 * @param user - The user object //!TODO: Create a TypeScript interface for the user object: onboarding learning context, etc
 * @returns A word object as a JS object
 */

const buildWord = async (word: string): Promise<IWord> => {
  const openAI = new OpenAI();
  try {
    const response = await openAI.chat.completions.create({
      messages: [{ role: "system", content: createPrompt(word) }],
      model: "gpt-4o", //! TODO: This should be an environment variable so premium users can use the Davinci (premium) model
      response_format: { type: "json_object" },
    });

    if (DEBUGGING) console.log(response);

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

async function listVoices(languageCode: string = "en-US") {
  const textToSpeech = require("@google-cloud/text-to-speech");

  const client = new textToSpeech.TextToSpeechClient();

  const [result] = await client.listVoices({ languageCode });
  const voices = result.voices;

  voices.forEach((voice: any) => {
    console.log(`${voice.name} (${voice.ssmlGender}): ${voice.languageCodes}`);
  });
}
