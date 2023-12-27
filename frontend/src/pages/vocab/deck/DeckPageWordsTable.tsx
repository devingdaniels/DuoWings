import React from "react";
import { IVocabWord } from "../../../interfaces";

interface DeckPageTableProps {
  words: IVocabWord[];
}

const DeckPageWordsTable: React.FC<DeckPageTableProps> = ({ words }) => {
  return (
    <div className="word-table-container">
      <table>
        <thead>
          <tr>
            <th>Word</th>
            <th>Definition</th>
            <th>Example Sentence</th>
            <th>Word Type</th>
            <th>Correct Count</th>
            <th>Incorrect Count</th>
          </tr>
        </thead>
        <tbody>
          {words.map((word: IVocabWord) => (
            <tr key={word._id}>
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
