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
  data: { name: string; message: string };
}

export interface IVocabularyWord {
  word: string;
  englishDefinition: string;
  exampleSentence: string;
  wordType: string;
  conjugation: string;
  correctCount: number[];
  incorrectCount: number[];
  lastCorrectDate: Date | null;
  lastIncorrectDate: Date | null;
}

enum ICardInsertionOrder {
  Top = "first",
  Bottom = "last",
  Random = "random",
}

export interface INewVocabDeck {
  name: string;
  description: string;
  tags: string[];
  preferences: {
    insertOrder: ICardInsertionOrder;
    favorited: Boolean;
  };
}
