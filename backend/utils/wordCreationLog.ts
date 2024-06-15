const fs = require("fs").promises;
const path = require("path");

interface NewWord {
  word: object;
  timestamp: string;
}

export async function writeWordToFile(obj: NewWord) {
  let res;
  await writeWordToFileHelper({
    word: obj.word,
    timestamp: obj.timestamp,
  })
    .then((result) => {
      if (result === 1) res = 1;
      else res = 0;
    })
    .catch((error) => {
      res = error;
    });

  return res;
}

async function writeWordToFileHelper(newWord: NewWord) {
  try {
    // Dirname: /Users/dev/Desktop/DevMacPro/coding/duoWings/backend/dist/utils
    const targetDir = path.join(__dirname, "..", "..", "services", "openai"); // Users/dev/Desktop/DevMacPro/coding/duoWings/backend/services/openai
    // Create the directory if it doesn't exist
    await fs.mkdir(targetDir, { recursive: true });
    // Create the file path
    const filePath = path.join(targetDir, "createdWords.json"); // Users/dev/Desktop/DevMacPro/coding/duoWings/backend/services/openai/createdWords.json

    let wordsArray = [];

    const fileContents = await fs.readFile(filePath, { encoding: "utf8" });
    // Check if fileContents is not empty to avoid JSON.parse() error on empty string
    if (fileContents) {
      wordsArray = JSON.parse(fileContents);
      // Ensure the parsed content is an array
      if (!Array.isArray(wordsArray)) {
        throw new Error("File content is not an array");
      }
    }
    // Append the new word to the array
    wordsArray.push(newWord);
    // Write the updated array back to the file
    // Note: Removed the comma at the end to maintain valid JSON format
    const dataToWrite = JSON.stringify(wordsArray, null, 2) + "\n";
    await fs.writeFile(filePath, dataToWrite, { encoding: "utf8" });
    return 1;
  } catch (error) {
    console.error("Error appending to file:", error);
  }
}
