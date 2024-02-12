/*
  ***************************** 
          USER AUTH INTERFACES
  *****************************
*/

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
  identifier: string;
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

/*
  ***************************** 
          DECK AND WORDS INTERFACES
  *****************************
*/

export interface ICreateNewVocabWord {
  word: string;
  deckID: string;
}

export interface ICreateNewDeck {
  name: string;
  description: string;
}

export interface IWordDeck {
  _id: string;
  name: string;
  description?: string;
  tags?: string[];
  creationDate: Date;
  preferences: {
    insertOrder: string[];
    favorited: boolean;
  };
  words: IVocabWord[];
}

export interface IVocabWord {
  _id: string;
  deckID: string;
  word: string;
  definition: string;
  exampleSentence: string;
  wordType: string;
  conjugation: string;
  correctCount: number[];
  incorrectCount: number[];
  lastCorrectDate: Date | null;
  lastIncorrectDate: Date | null;
  stats: {
    difficulty: number;
    creationDate: Date;
    correctCount: number;
    incorrectCount: number;
  };
}
