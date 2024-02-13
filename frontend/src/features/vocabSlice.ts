import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { VocabService } from "./vocabService";
import { ICreateNewDeck, IWordDeck } from "../interfaces/index";
import { ICreateNewVocabWord } from "../interfaces/index";

const NAMESPACE = "vocabSlice.ts";

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
  currentDeck: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

/*
  
  ***************************** 
          DECK THUNKS 
  *****************************
  
*/

// Create an async thunk to fetch user decks from the backend
const fetchAllUserDecks = createAsyncThunk(
  "vocab/fetchAllUserDecks",
  async (_, { rejectWithValue }) => {
    try {
      const response = await VocabService.fetchAllDecks();
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

const getDeckByID = createAsyncThunk(
  "vocab/getDeckByID",
  async (deckId: string, { rejectWithValue }) => {
    try {
      const response = await VocabService.fetchDeckByID(deckId);
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

const createDeck = createAsyncThunk(
  "vocab/createDeck",
  async (deck: ICreateNewDeck, { rejectWithValue }) => {
    try {
      const response = await VocabService.createDeck(deck);
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

const deleteDeckByID = createAsyncThunk(
  "vocab/deleteDeckByID",
  async (deckID: string, { rejectWithValue }) => {
    try {
      const response = await VocabService.deleteDeckByID(deckID);
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

/*
  ***************************** 
          WORD THUNKS 
  *****************************
*/

const createWord = createAsyncThunk(
  "vocab/createWord",
  async (word: ICreateNewVocabWord, { rejectWithValue }) => {
    try {
      return await VocabService.createWord(word);
    } catch (error: any) {
      const errorMessage = error.message || "Failed to create word.";
      console.log(NAMESPACE, "Failed to create word.");
      return rejectWithValue(errorMessage);
    }
  }
);

const deleteWordByID = createAsyncThunk(
  "vocab/deleteWordByID",
  async (wordID: string, { rejectWithValue }) => {
    try {
      return await VocabService.deleteWordByID(wordID);
    } catch (error: any) {
      const errorMessage = error.message || "Failed to delete word.";
      console.log(NAMESPACE, "Failed to delete word.");
      return rejectWithValue(errorMessage);
    }
  }
);

// Create the deckSlice
const vocabSlice = createSlice({
  name: "vocab",
  initialState,
  reducers: {
    setCurrentDeck: (state, action) => {
      state.currentDeck = action.payload;
    },
    resetErrorState: (state) => {
      state.isError = false;
      state.message = "";
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
        state.message = "";
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
      // Handle the createDeck async thunk
      .addCase(createDeck.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createDeck.fulfilled, (state) => {
        state.isSuccess = true;
        state.isLoading = false;
      })
      .addCase(createDeck.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error.message as string;
      })
      // Handle the deleteDeckByID async thunk
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
      })

      /* WORD CASES */
      .addCase(createWord.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })

      .addCase(createWord.fulfilled, (state, action) => {
        state.currentDeck = action.payload.responseDeck;
        state.isSuccess = true;
        state.isLoading = false;
        state.isError = false;
      })

      .addCase(createWord.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.payload as string;
      })

      .addCase(deleteWordByID.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })

      .addCase(deleteWordByID.fulfilled, (state, action) => {
        // state.currentDeck = action.payload.responseDeck;
        state.isSuccess = true;
        state.isLoading = false;
        state.isError = false;
      })

      .addCase(deleteWordByID.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.payload as string;
      });
  },
});

const clearUserDeckState = createAction("vocab/clearDeckState");
const { setCurrentDeck } = vocabSlice.actions;
const { resetErrorState } = vocabSlice.actions;

const VocabSliceService = {
  createDeck,
  fetchAllUserDecks,
  getDeckByID,
  deleteDeckByID,
  createWord,
  deleteWordByID,
  clearUserDeckState,
  setCurrentDeck,
  resetErrorState,
};

export { VocabSliceService };
// Reducer
export default vocabSlice.reducer;
