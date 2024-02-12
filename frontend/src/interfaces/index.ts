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
interface IConjugation {
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

export interface IWord {
  _id: string;
  word: string;
  definition: string;
  exampleSentence: string;
  wordType: string;
  conjugations: {
    present?: IConjugation;
    preterite?: IConjugation;
    future?: IConjugation;
    imperfect?: IConjugation;
  };
  stats: Stats;
  tags: string[];
}

export interface IWordDeck {
  _id: string;
  userID: string;
  name: string;
  description?: string;
  tags?: string[];
  creationDate: Date;
  favorited?: boolean;
  words: IWord[];
}
