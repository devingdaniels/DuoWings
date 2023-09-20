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
export const fetchDecks = createAsyncThunk("decks/fetchDecks", async () => {
  try {
    const response = await deckService.fetchAllDecks();
    return response;
  } catch (error) {
    throw error;
  }
});

// Create the deckSlice
const deckSlice = createSlice({
  name: "decks",
  initialState,
  reducers: {
    reset: (state) => {
      state.decks = null;
      state.isSuccess = false;
      state.isLoading = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDecks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchDecks.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.isError = false;
        state.decks = action.payload;
      })
      .addCase(fetchDecks.rejected, (state, action) => {
        state.isError = true;
        state.message = action.error.message as string;
        state.isLoading = false;
      });
  },
});

export const { reset } = deckSlice.actions;
export default deckSlice.reducer;
