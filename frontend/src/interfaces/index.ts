export interface IUserRegister {
  fname: string;
  lname: string;
  email: string;
  phonenumber: string;
  password: string;
  confirmPassword: string;
}

export interface IUserLogin {
  email: string;
  password: string;
}

export interface IUserAuthResponse {
  status: boolean;
  data: {
    name: string;
    message: string;
  };
}

export interface ICreateNewVocabWord {
  word: string;
  deckID: string;
}

export interface IWordDeck {
  _id: string;
  name: string;
  description: string;
  tags?: string[];
  creationDate: Date;
  lastStudied: Date;
  preferences: {
    insertOrder: number[];
    favorited: boolean;
  };
  words: IVocabWord[];
  // Stop
  experiencePoints: number;
  level: number;
  completedChallenges: string[];
  badges: string[];
  streak: number;
  lastStreakDate?: Date;
}

export interface IVocabWord {
  _id: string;
  word: string;
  englishDefinition: string;
  exampleSentence: string;
  wordType: string;
  conjugation: string;
  correctCount: number[];
  incorrectCount: number[];
  lastCorrectDate: Date | null;
  lastIncorrectDate: Date | null;
  deckID: string;
}
