// deckSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import deckService from "./deckService";

import { IWordDeck } from "../interfaces/index";

interface DeckState {
  decks: IWordDeck[] | [];
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  message: string;
}

const initialState: DeckState = {
  decks: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

// Create an async thunk to fetch user decks from the backend
export const fetchAllUserDecks = createAsyncThunk(
  "decks/fetchDecks",
  async (_, { rejectWithValue }) => {
    try {
      const response = await deckService.fetchAllDecks();
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
const deckSlice = createSlice({
  name: "decks",
  initialState,
  reducers: {
    resetDeckStatus: (state) => {
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
    builder
      .addCase(fetchAllUserDecks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllUserDecks.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.isError = false;
        state.decks = action.payload;
      })
      .addCase(fetchAllUserDecks.rejected, (state, action) => {
        state.isError = true;
        state.message = action.error.message as string;
        state.isLoading = false;
        state.isSuccess = false;
      });
  },
});

export const { setUserDecks } = deckSlice.actions;
export const { resetDeckStatus } = deckSlice.actions;
export default deckSlice.reducer;
