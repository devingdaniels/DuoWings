import React from "react";
import { useState } from "react";

const UploadWordsPage: React.FunctionComponent = () => {
  const [wordList, setWordList] = useState("");

  const handleCreateFlashcards = () => {
    // Split the pasted words into an array
    const wordsArray = wordList.split("\n").map((word: string) => word.trim());

    console.log(wordsArray);
  };

  return (
    <div>
      <h1>Flashcard Generator</h1>
      <textarea
        rows={10}
        cols={30}
        placeholder="Paste your words here (one word per line)"
        value={wordList}
        onChange={(e) => {
          setWordList(e.target.value);
        }}
      ></textarea>
      <br />
      <button onClick={handleCreateFlashcards}>Create Flashcards</button>
    </div>
  );
};

export default UploadWordsPage;
