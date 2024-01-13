import dotenv from "dotenv";
dotenv.config();
import OpenAI from "openai";

const NAMESPACE = "openai word builder";
const openAI = new OpenAI();

// Returns a stringified JSON object
//! TODO: Create TypeScript interface for the user object
const buildWord = async (word: string, user: any): Promise<string> => {
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
      model: "gpt-3.5-turbo-1106", //! TODO: This should be an environment variable so premium users can use the Davinci model
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

export { buildWord };
