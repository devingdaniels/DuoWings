import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import { getDeckByID } from "../../../features/deckSlice";
import NewWordForm from "../words/NewWordForm";
import { IWordDeck } from "../../../interfaces";

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

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {currentDeck && !isLoading && (
        <div>
          <h1>Deck Details</h1>
          <p>Deck ID: {deckId}</p>
          <p>Deck Name: {currentDeck.name}</p>
        </div>
      )}

      {isError && <p>Error: {message}</p>}
      {deckId && <NewWordForm deckID={deckId} />}
    </div>
  );
};

export default DeckPage;
