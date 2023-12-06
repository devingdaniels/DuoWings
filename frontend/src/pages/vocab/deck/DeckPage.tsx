import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import {
  selectCurrentUserDeck,
  getDeckByID,
} from "../../../features/deckSlice";
import NewWordForm from "../words/NewWordForm";

const DeckPage = () => {
  const dispatch = useAppDispatch();
  const deck = useAppSelector(selectCurrentUserDeck);
  const { isLoading, isError, message } = useAppSelector(
    (state) => state.decks
  );

  const { deckId } = useParams();

  useEffect(() => {
    // Fetch deck by ID when the component mounts
    dispatch(getDeckByID(deckId));
  }, [dispatch, deckId]); // Include dispatch and deckId in the dependency array

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {deck && !isLoading && (
        <div>
          <h1>Deck Details</h1>
          <p>Deck ID: {deckId}</p>
          <p>Deck Name: {deck.name}</p>
        </div>
      )}
      {isError && <p>Error: {message}</p>}
      {deckId && <NewWordForm deckID={deckId} />}
    </div>
  );
};

export default DeckPage;
