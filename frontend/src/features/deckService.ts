import { INewVocabDeck } from "../interfaces";

const createDeck = async (deck: INewVocabDeck) => {
  console.log(deck);
  return deck;
};

const deckService = {
  createDeck,
};

export default deckService;
