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

export interface IDeckData {
  name: string;
  description: string;
  tags: string[];
}

export interface IWordEntry {
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

export interface IDeckProps {
  deck: {
    id: number;
    name: string;
    description: string;
    tags: string[];
    words: IWordEntry[];
    laststudy: Date | null;
  };
}

// words: {
//   word: string;
//   englishDefinition: string;
//   exampleSentence: string;
//   wordType: string;
//   conjugation: string;
//   correctCount: number[];
//   incorrectCount: number[];
//   lastCorrectDate: Date | null;
//   lastIncorrectDate: Date | null;
// }[];
