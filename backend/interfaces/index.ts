import mongoose from "mongoose";

interface Conjugation {
  yo?: string;
  tu?: string;
  el?: string;
  nosotros?: string;
  vosotros?: string;
  ellos?: string;
}

interface Stats {
  difficulty: number;
  creationDate: Date;
  correctCount: number;
  incorrectCount: number;
}

interface Word {
  word: string;
  definition: string;
  exampleSentence: string;
  wordType: string;
  conjugations: {
    present?: Conjugation;
    preterite?: Conjugation;
    future?: Conjugation;
    imperfect?: Conjugation;
  };
  stats: Stats;
  tags: string[];
}

interface WordDeck {
  userID: mongoose.Types.ObjectId;
  name: string;
  description?: string;
  tags?: string[];
  creationDate: Date;
  preferences: {
    insertOrder: string[];
    favorited?: boolean;
  };
  words: Word[];
}

export default WordDeck;
