export interface IUserRegister {
  fname: string;
  lname: string;
  username: string;
  email: string;
  phonenumber: string | "";
  password: string;
  confirmPassword: string;
}

export interface IUserLogin {
  email: string;
  password: string;
}

// User interface after authentication
export interface IUser {
  _id: string;
  fname: string;
  lname: string;
  username: string;
  email: string;
  phonenumber: string | "";
  role: "user" | "admin";
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
  definition: string;
  deckID: string;
}

export interface ICreateNewDeck {
  name: string;
  description: string;
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
  definition: string;
  exampleSentence: string;
  wordType: string;
  conjugation: string;
  correctCount: number[];
  incorrectCount: number[];
  lastCorrectDate: Date | null;
  lastIncorrectDate: Date | null;
  deckID: string;
}
