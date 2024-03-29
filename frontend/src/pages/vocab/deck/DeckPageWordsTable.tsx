import React, { useState, useRef } from "react";
import { IWord } from "../../../interfaces";
import { FcEmptyTrash } from "react-icons/fc";
import { AiTwotoneEdit } from "react-icons/ai";
import { VocabSliceService } from "../../../features/vocabSlice";
import { toastService } from "../../../utils/Toastify";
import { useAppDispatch } from "../../../app/hooks";
import { GiSaveArrow } from "react-icons/gi";

interface DeckPageTableProps {
  words: IWord[];
}

const DeckPageWordsTable: React.FC<DeckPageTableProps> = ({ words }) => {
  const dispatch = useAppDispatch();
  const [editableWordId, setEditableWordId] = useState<string | null>(null);
  const [updateDeck, setUpateDeck] = useState<IWord | null>(null);
  const initialValuesRef = useRef<IWord | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>,
    fieldName: string
  ) => {
    if (!updateDeck) return;
    setUpateDeck({ ...updateDeck, [fieldName]: e.target.value });
  };

  const toggleEdit = (wordID: string, word: IWord) => {
    if (editableWordId === wordID) {
      // Exiting edit mode, check for changes
      if (JSON.stringify(initialValuesRef.current) !== JSON.stringify(updateDeck)) {
        handleUpdateWord();
      }
      setEditableWordId(null);
      setUpateDeck(null);
      initialValuesRef.current = null;
    } else {
      // Entering edit mode, store initial values
      setEditableWordId(wordID);
      setUpateDeck(word);
      initialValuesRef.current = word;
    }
  };

  const handleUpdateWord = async () => {
    if (!updateDeck) return;

    const response = await dispatch(VocabSliceService.updateWordInDeckByID(updateDeck));
    console.log(response);
    if (response.type === "vocab/updateWordInDeckByID/fulfilled") {
      toastService.success(response.payload.message);
      await dispatch(VocabSliceService.resetDeckStatusFlagsToDefault());
    } else {
      toastService.error(response.payload);
      dispatch(VocabSliceService.resetErrorState());
    }
  };

  const handleDeleteWord = async (wordID: string) => {
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
            <th>Type</th>
            <th>Level</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {words.map((word, index) => (
            <tr key={word._id}>
              <td>{index + 1}</td>
              <td>
                {editableWordId === word._id ? (
                  <textarea
                    rows={5}
                    defaultValue={word.word}
                    onChange={(e) => handleInputChange(e, "word")}
                  />
                ) : (
                  word.word
                )}
              </td>
              <td>
                {editableWordId === word._id ? (
                  <textarea
                    rows={5}
                    defaultValue={word.definition}
                    onChange={(e) => handleInputChange(e, "definition")}
                  />
                ) : (
                  word.definition
                )}
              </td>
              <td>
                {editableWordId === word._id ? (
                  <textarea
                    rows={5}
                    defaultValue={word.exampleSentence}
                    onChange={(e) => handleInputChange(e, "exampleSentence")}
                  />
                ) : (
                  word.exampleSentence
                )}
              </td>
              <td>
                {editableWordId === word._id ? (
                  <textarea
                    rows={5}
                    defaultValue={word.wordType}
                    onChange={(e) => handleInputChange(e, "wordType")}
                  />
                ) : (
                  word.wordType
                )}
              </td>
              <td>{word.stats.level}</td>
              <td>
                {editableWordId === word._id ? (
                  <GiSaveArrow
                    className="save-word-icon"
                    onClick={() => toggleEdit(word._id, word)}
                    size={36}
                    color="#27ae60"
                  />
                ) : (
                  <AiTwotoneEdit
                    className="update-word-icon"
                    onClick={() => toggleEdit(word._id, word)}
                    size={25}
                    color="#f39c12"
                  />
                )}
              </td>
              <td>
                <FcEmptyTrash
                  className="delete-word-icon"
                  onClick={() => handleDeleteWord(word._id)}
                  size={25}
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
