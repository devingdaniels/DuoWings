// deckSlice.js
import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { VocabService } from "./vocabService";

import { ICreateNewDeck, IWordDeck } from "../interfaces/index";
import { ICreateNewVocabWord } from "../interfaces/index";
import { RootState } from "../app/store";

interface VocabState {
  decks: IWordDeck[] | [];
  currentDeck: IWordDeck | null;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  message: string;
}

const initialState: VocabState = {
  decks: [],
  currentDeck: null, // useful because as reference to improve performance
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

// Create an async thunk to fetch user decks from the backend
export const fetchAllUserDecks = createAsyncThunk(
  "vocab/getAllUserDecks",
  async (_, { rejectWithValue }) => {
    try {
      const response = await VocabService.fetchAllDecks();
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
  "vocab/getDeckByID",
  async (deckId: string, { rejectWithValue }) => {
    try {
      const response = await VocabService.fetchDeckByID(deckId);
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
  "vocab/createDeck",
  async (deck: ICreateNewDeck, { rejectWithValue }) => {
    try {
      const response = await VocabService.createDeck(deck);
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
  "vocab/deleteDeckByID",
  async (deckID: string, { rejectWithValue }) => {
    try {
      const response = await VocabService.deleteDeckByID(deckID);
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

/*
  
  ***************************** 
          WORD THUNKS 
  *****************************
  
*/

export const createWord = createAsyncThunk(
  "vocab/createWord",
  async (word: ICreateNewVocabWord, { rejectWithValue }) => {
    try {
      const response = await VocabService.createWord(word);
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
const vocabSlice = createSlice({
  name: "vocab",
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
    setCurrentDeck: (state, action) => {
      state.currentDeck = action.payload;
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
  state.vocab.currentDeck;
export const { setUserDecks } = vocabSlice.actions;
export const { resetDeckStatus } = vocabSlice.actions;
export const { setCurrentDeck } = vocabSlice.actions;
// Reducer
export default vocabSlice.reducer;
