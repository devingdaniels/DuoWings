import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import { getDeckByID } from "../../../features/deckSlice";
import NewWordForm from "../words/NewWordForm";
import { IWordDeck } from "../../../interfaces";
import Spinner from "../../../utils/Spinner";

const DeckPage = () => {
  const { deckId } = useParams();
  const dispatch = useAppDispatch();

  const [currentDeck, setCurrentDeck] = useState<IWordDeck | null>(null);

  const { isLoading, isError, message } = useAppSelector(
    (state) => state.decks
  );

  // Do stuff on component mount
  useEffect(() => {
    const fetchDeck = async () => {
      const res = await dispatch(getDeckByID(deckId));
      setCurrentDeck(res.payload);
    };
    fetchDeck();
  }, [dispatch, deckId]);

  if (isLoading) return <Spinner />;

  if (isError) return <p>Error: {message}</p>;

  return (
    <div>
      {currentDeck && !isLoading && (
        <div>
          <h1>{currentDeck.name}</h1>
          <p>ID: {deckId}</p>
          {deckId && <NewWordForm deckID={deckId} />}
        </div>
      )}
    </div>
  );
};

export default DeckPage;
