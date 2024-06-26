import mongoose from "mongoose";

interface IConjugation {
  yo?: string;
  tu?: string;
  el?: string;
  nosotros?: string;
  vosotros?: string;
  ellos?: string;
}

interface Stats {
  level: number;
  correctCount: number;
  incorrectCount: number;
}

export interface IWord {
  _id: mongoose.Types.ObjectId;
  userID: mongoose.Types.ObjectId;
  deckID: mongoose.Types.ObjectId;
  word: string;
  definition: string;
  wordType: string;
  exampleSentence: string;
  phoneticSpelling: string;
  isIrregular: boolean;
  isFavorite: boolean;
  conjugations: {
    present?: IConjugation;
    preterite?: IConjugation;
    future?: IConjugation;
    imperfect?: IConjugation;
  };
  stats: Stats;
  tags: string[];
  creationDate: Date;
}
export interface IWordDeck {
  _id: mongoose.Types.ObjectId;
  userID: mongoose.Types.ObjectId;
  name: string;
  words: mongoose.Types.ObjectId[];
  description?: string;
  tags?: string[];
  creationDate: Date;
  isFavorite: boolean;
  level: number;
}
