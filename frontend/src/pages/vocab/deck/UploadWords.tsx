import React from "react";
import { useState } from "react";
import { FcUpload } from "react-icons/fc";

const UploadWordsPage: React.FunctionComponent = () => {
  const [wordList, setWordList] = useState("");

  const handleCreateFlashcards = () => {
    // Split the pasted words into an array
    const wordsArray = wordList.split("\n").map((word: string) => word.trim());

    console.log(wordsArray);
  };

  return (
    <div className="upload-word-list-page">
      <h1>Vocab Generator</h1>
      <textarea
        rows={10}
        cols={30}
        placeholder="Paste your words here, one per line separated by commas. Example: word1, word2, word3"
        value={wordList}
        onChange={(e) => {
          setWordList(e.target.value);
        }}
      ></textarea>
      <br />
      <div
        onClick={handleCreateFlashcards}
        className="upload-words-button"
        title="Upload words to deck"
      >
        <FcUpload size={35} />
        Upload
      </div>
    </div>
  );
};

export default UploadWordsPage;
