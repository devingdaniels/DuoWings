const fs = require("fs").promises;
const path = require("path");

export async function logNewWordToFile(newWord: string) {
  try {
    const targetDir = path.join(__dirname, "..", "..", "services", "openai");
    await fs.mkdir(targetDir, { recursive: true });
    const filePath = path.join(targetDir, "createdWords.json");

    let wordsArray = [];

    // Try reading the file and parsing its contents
    try {
      const fileContents = await fs.readFile(filePath, { encoding: "utf8" });
      // Check if fileContents is not empty to avoid JSON.parse() error on empty string
      if (fileContents) {
        wordsArray = JSON.parse(fileContents);
        // Ensure the parsed content is an array
        if (!Array.isArray(wordsArray)) {
          throw new Error("File content is not an array");
        }
      }
    } catch (readError: any) {
      if (readError.code !== "ENOENT" && readError.message !== "File content is not an array") {
        // ENOENT = Error NO ENTry (i.e., file not found)
        // If the error is not due to a non-existent file or non-array content, rethrow it
        throw readError;
      }
      // If the file doesn't exist or isn't an array, start with an empty array
    }

    // Append the new word to the array
    wordsArray.push(newWord);

    // Write the updated array back to the file
    // Note: Removed the comma at the end to maintain valid JSON format
    const dataToWrite = JSON.stringify(wordsArray, null, 2) + "\n";
    await fs.writeFile(filePath, dataToWrite, { encoding: "utf8" });
  } catch (error) {
    console.error("Error appending to file:", error);
  }
}
