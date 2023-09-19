/**
 * Represents user registration data.
 */
export interface IUserRegister {
  fname: string; // First name of the user.
  lname: string; // Last name of the user.
  email: string; // User's email address.
  phonenumber: string; // User's phone number.
  password: string; // User's password.
  confirmPassword: string; // Confirm password to ensure accuracy.
}

/**
 * Represents user login data.
 */
export interface IUserLogin {
  email: string; // User's email address.
  password: string; // User's password.
}

/**
 * Represents the response from user authentication.
 */
export interface IUserAuthResponse {
  status: boolean; // Indicates the authentication status.
  data: {
    name: string; // User's name.
    message: string; // Additional message related to authentication.
  };
}

/**
 * Represents a vocabulary word and its associated information.
 */
export interface IVocabularyWord {
  word: string; // The vocabulary word.
  englishDefinition: string; // Definition of the word in English.
  exampleSentence: string; // An example sentence using the word.
  wordType: string; // Type or category of the word.
  conjugation: string; // Word's conjugation (if applicable).
  correctCount: number[]; // Array of counts for correct responses.
  incorrectCount: number[]; // Array of counts for incorrect responses.
  lastCorrectDate: Date | null; // Date of the last correct response (or null if none).
  lastIncorrectDate: Date | null; // Date of the last incorrect response (or null if none).
}

/**
 * Specifies the order in which new vocabulary cards are inserted into a deck.
 */
enum ICardInsertionOrder {
  Top = "first", // Insert new cards at the top of the deck.
  Bottom = "last", // Insert new cards at the bottom of the deck.
  Random = "random", // Insert new cards at a random position in the deck.
}

/**
 * Represents a new vocabulary deck with its metadata.
 */
export interface INewVocabDeck {
  name: string; // Name of the vocabulary deck.
  description: string; // Description of the deck.
  tags: string[]; // Tags associated with the deck.
  insertOrder: ICardInsertionOrder; // Order for inserting new cards into the deck.
}
