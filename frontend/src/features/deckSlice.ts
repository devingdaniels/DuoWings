// deckSlice.js
import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import deckService from "./deckService";

import { IWordDeck } from "../interfaces/index";
import { INewVocabDeck } from "../interfaces/index";
import { RootState } from "../app/store";

interface DeckState {
  decks: IWordDeck[] | [];
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  message: string;
  currentDeck: IWordDeck | null;
}

const initialState: DeckState = {
  decks: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
  currentDeck: null,
};

// Create an async thunk to fetch user decks from the backend
export const fetchAllUserDecks = createAsyncThunk(
  "decks/getAllUserDecks",
  async (_, { rejectWithValue }) => {
    try {
      const response = await deckService.fetchAllDecks();
      return response;
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return rejectWithValue(message);
    }
  }
);

export const getDeckByID = createAsyncThunk(
  "decks/getDeckByID",
  async (deckId: string | undefined, { rejectWithValue }) => {
    try {
      const response = await deckService.fetchDeckByID(deckId);
      return response;
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return rejectWithValue(message);
    }
  }
);

export const createDeck = createAsyncThunk(
  "decks/createDeck",
  async (deck: INewVocabDeck, { rejectWithValue }) => {
    try {
      const response = await deckService.createDeck(deck);
      return response;
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return rejectWithValue(message);
    }
  }
);

export const deleteDeckByID = createAsyncThunk(
  "decks/deleteDeckByID",
  async (deckID: string, { rejectWithValue }) => {
    try {
      const response = await deckService.deleteDeckByID(deckID);
      return response;
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
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
      // Handle the logout action to reset deckSlice
      .addCase(clearUserDeckState, (state) => {
        state.decks = [];
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
        state.currentDeck = null;
      })

      // Handle the fetchAllUserDecks async thunk
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
      })

      // Handle the getDeckByID async thunk
      .addCase(getDeckByID.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDeckByID.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.currentDeck = action.payload as IWordDeck;
      })
      .addCase(getDeckByID.rejected, (state, action) => {
        state.isError = true;
        state.message = action.error.message as string;
        state.isLoading = false;
        state.isSuccess = false;
      })

      // Handle the create async thunk
      .addCase(createDeck.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createDeck.fulfilled, (state) => {
        state.isSuccess = true;
        state.isLoading = false;
        // state.fetchedDeck = action.payload as IWordDeck;
      })
      .addCase(createDeck.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error.message as string;
      })

      // Handle the delete async thunk
      .addCase(deleteDeckByID.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteDeckByID.fulfilled, (state) => {
        state.isSuccess = true;
        state.isLoading = false;
      })
      .addCase(deleteDeckByID.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error.message as string;
      });
  },
});

// Actions
export const clearUserDeckState = createAction("decks/clearUserDeckState");
export const selectCurrentUserDeck = (state: RootState) =>
  state.decks.currentDeck;
export const { setUserDecks } = deckSlice.actions;
export const { resetDeckStatus } = deckSlice.actions;
// Reducer
export default deckSlice.reducer;
