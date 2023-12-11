import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import { createWord } from "../../../features/vocabSlice";
import CreateWordForm from "../words/CreateWordForm";
import Spinner from "../../../utils/Spinner";
import { ICreateNewVocabWord } from "../../../interfaces/index";
import { VocabSliceService } from "../../../features/vocabSlice";
import { Button } from "@mui/material";

const DeckPage = () => {
  const dispatch = useAppDispatch();
  const currentDeck = useAppSelector(VocabSliceService.getCurrentDeck);

  const { isLoading, isError, message } = useAppSelector(
    (state) => state.vocab
  );

  const handleCreateNewWord = async (word: string) => {
    const newWord: ICreateNewVocabWord = {
      word,
      deckID: currentDeck!._id,
    };
    const response = await dispatch(createWord(newWord));
    console.log(response);
  };

  if (isLoading) return <Spinner />;

  if (isError)
    return <p>Error: There was an error in the application -- {message}</p>;

  return (
    <div className="deck-page-container">
      {currentDeck && !isLoading && (
        <div>
          <h1>{currentDeck.name}</h1>
          <p>ID: {currentDeck._id}</p>
          <CreateWordForm handleCreateNewWord={handleCreateNewWord} />
          <Button>Upload words</Button>
          {currentDeck.words.map((item) => {
            return (
              <div key={item._id}>
                <p>{item.word}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DeckPage;
