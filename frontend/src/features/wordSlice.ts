import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import wordService from "./wordService";

import { INewVocabWord } from "../interfaces/index";
// import { RootState } from "../app/store";

interface WordState {
  word: INewVocabWord | null;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  message: string;
}

const initialState: WordState = {
  word: null,
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
  },
  extraReducers: (builder) => {
    builder.addCase(createWord.pending, (state) => {
      state.isLoading = true;
    });
    //! after creating a new word, I need to find the deck from redux state and push the word onto the deck.words array
  },
});

// Actions
export const { resetWordStatus } = wordSlice.actions;
// Reducer
export default wordSlice.reducer;
