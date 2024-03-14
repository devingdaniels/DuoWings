// import FlashCard from "./FlashCard";

import { useAppSelector } from "../../../app/hooks";

const FlashCardsPage = () => {
  const { currentDeck } = useAppSelector((state) => state.vocab);

  return (
    <>
      <>{currentDeck?.name}</>
    </>
  );
};

export default FlashCardsPage;
