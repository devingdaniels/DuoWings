import FlashCard from "./FlashCard";

import { useAppSelector, useAppDispatch } from "../../../app/hooks";

const FlashCardsPage = () => {
  const { currentDeck, isLoading, isError, message } = useAppSelector((state) => state.vocab);

  return (
    <>
      <>{currentDeck?.name}</>
    </>
  );
};

export default FlashCardsPage;
