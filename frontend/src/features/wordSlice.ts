// deckSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import wordService from "./wordService";

import { IWordDeck } from "../interfaces/index";
import { INewVocabWord } from "../interfaces/index";
// import { RootState } from "../app/store";

interface WordState {
  decks: IWordDeck[] | [];
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  message: string;
}

const initialState: WordState = {
  decks: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

export const createWord = createAsyncThunk(
  "words/createWord",
  async (word: INewVocabWord, { rejectWithValue }) => {
    try {
      const response = await wordService.createWord(word);
      return response;
    } catch (error: any) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return rejectWithValue(message);
    }
  }
);

// Create the deckSlice
const wordSlice = createSlice({
  name: "words",
  initialState,
  reducers: {
    resetWordStatus: (state) => {
      state.isSuccess = false;
      state.isLoading = false;
      state.isError = false;
      state.message = "";
    },
    setUserDecks: (state, action) => {
      state.decks = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createWord.pending, (state) => {
      state.isLoading = true;
    });
  },
});

// Actions
export const { resetWordStatus } = wordSlice.actions;
// Reducer
export default wordSlice.reducer;
