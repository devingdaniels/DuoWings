import React from "react";
import { IWord } from "../../../interfaces";
import { AiOutlineDelete } from "react-icons/ai";
import { useAppDispatch } from "../../../app/hooks";
import { VocabSliceService } from "../../../features/vocabSlice";
import { toastService } from "../../../utils/Toastify";

interface DeckPageTableProps {
  words: IWord[];
}

const DeckPageWordsTable: React.FC<DeckPageTableProps> = ({ words }) => {
  const dispatch = useAppDispatch();

  const handleClick = async (wordID: string) => {
    const response = await dispatch(VocabSliceService.deleteWordFromDeckByID(wordID));

    if (response.type === "vocab/deleteWordFromDeckByID/fulfilled") {
      toastService.success("Delete successful!");
      dispatch(VocabSliceService.resetDeckStatusFlagsToDefault());
    } else {
      console.log("toast triggered from DeckPageWordsTable.tsx");
      toastService.error(response.payload);
      dispatch(VocabSliceService.resetErrorState());
    }
  };

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
            <th>Delete</th>
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
              <td>
                <AiOutlineDelete
                  className="delete-container"
                  onClick={() => handleClick(word._id)}
                  size={30}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DeckPageWordsTable;
