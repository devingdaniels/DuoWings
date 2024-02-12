import React from "react";
import { IWord } from "../../../interfaces";

interface DeckPageTableProps {
  words: IWord[];
}

const DeckPageWordsTable: React.FC<DeckPageTableProps> = ({ words }) => {
  return (
    <div className="word-table-container">
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Word</th>
            <th>Definition</th>
            <th>Example Sentence</th>
            <th>Word Type</th>
            <th>Correct Count</th>
            <th>Incorrect Count</th>
          </tr>
        </thead>
        <tbody>
          {words.map((word: IWord, index: number) => (
            <tr key={word._id}>
              <td>{index + 1}</td>
              <td>{word.word}</td>
              <td>{word.definition}</td>
              <td>{word.exampleSentence}</td>
              <td className="wordType">{word.wordType}</td>
              <td>{word.stats.correctCount}</td>
              <td>{word.stats.incorrectCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DeckPageWordsTable;
