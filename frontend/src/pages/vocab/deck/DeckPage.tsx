import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import { createWord } from "../../../features/wordSlice";
import NewWordForm from "../words/NewWordForm";
import Spinner from "../../../utils/Spinner";

const DeckPage = () => {
  const dispatch = useAppDispatch();

  const { currentDeck, isLoading, isError, message } = useAppSelector(
    (state) => state.decks
  );

  const handleCreateNewWord = async (word: string) => {
    const response = await dispatch(createWord(word));
    console.log(response);
  };

  if (isLoading) return <Spinner />;

  if (isError)
    return <p>Error: There was an error in the application -- {message}</p>;

  return (
    <div>
      {currentDeck && !isLoading && (
        <div>
          <h1>{currentDeck.name}</h1>
          <p>ID: {currentDeck._id}</p>
          <NewWordForm handleCreateNewWord={handleCreateNewWord} />
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
