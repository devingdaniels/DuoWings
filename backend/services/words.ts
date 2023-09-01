import * as fs from "fs/promises";
import { Response, Request } from "express";

// Function to read a file and create an array of words
async function readFileAndCreateArray(filePath: string): Promise<string[]> {
  try {
    const content = await fs.readFile(filePath, "utf8");
    // Split the content into lines
    const lines = content.split("\n");
    const wordsArray: string[] = [];

    // Loop through the lines and split into words
    for (const line of lines) {
      const words = line.split(",");
      for (const word of words) {
        const trimmedWord = word.trim();
        wordsArray.push(trimmedWord);
      }
    }

    return wordsArray;
  } catch (error) {
    console.error("An error occurred while reading the file:", error);
    return [];
  }
}

// Example usage:
export async function getAllWords(req: Request, res: Response): Promise<void> {
  console.log("getAllWords() called");
  const filePath = "./services/words.txt";
  const wordsArray = await readFileAndCreateArray(filePath);
  wordsArray.sort();
  res.status(200).json(wordsArray);
}
