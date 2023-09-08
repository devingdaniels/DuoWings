import * as fs from "fs/promises";
import { Response, Request } from "express";

function capitalizeFirstLetter(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

async function readFileAndCreateArray(filePath: string): Promise<string[]> {
  try {
    const content = await fs.readFile(filePath, "utf8");
    // Split the content into lines, remove leading/trailing whitespace and filter out empty lines
    const lines = content
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => line !== "");
    const wordsArray: string[] = [];
    // Loop through the lines and split into words
    for (const line of lines) {
      const words = line.split(",");
      for (const word of words) {
        wordsArray.push(capitalizeFirstLetter(word.trim()));
      }
    }
    return wordsArray;
  } catch (error) {
    console.error("An error occurred while reading the file:", error);
    return [];
  }
}

export async function getAllWords(req: Request, res: Response): Promise<void> {
  const filePath = "./services/words.txt";
  const wordsArray = await readFileAndCreateArray(filePath);
  wordsArray.sort();
  res.status(200).json(wordsArray);
}
