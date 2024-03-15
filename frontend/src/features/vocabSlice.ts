import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { VocabService } from "./vocabService";
import { ICreateNewDeck, IWordDeck } from "../interfaces/index";
import { ICreateNewVocabWord } from "../interfaces/index";

const NAMESPACE = "vocabSlice.ts";

const DEBUGGING = true;

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
      if (DEBUGGING) console.log(NAMESPACE, "fetchAllUserDecks response:", response);
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
      if (DEBUGGING) console.log(NAMESPACE, "getDeckByID response:", response);
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
      if (DEBUGGING) console.log(NAMESPACE, "createDeck response:", response);
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
      if (DEBUGGING) console.log(NAMESPACE, "deleteDeckByID response:", response);
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
      const response = await VocabService.createWord(word);
      if (DEBUGGING) console.log(NAMESPACE, "createWord response:", response);
      return response;
    } catch (error: any) {
      const errorMessage = error.message || "Failed to create word.";
      console.log(NAMESPACE, error);
      return rejectWithValue(errorMessage);
    }
  }
);

const deleteWordFromDeckByID = createAsyncThunk(
  "vocab/deleteWordFromDeckByID",
  async (wordID: string, { rejectWithValue }) => {
    try {
      const response = await VocabService.deleteWordByID(wordID);
      if (DEBUGGING) console.log(NAMESPACE, "deleteWordByID response:", response);
      return response;
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

    resetDeckStatusFlagsToDefault: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
    },

    resetCurrentDeck: (state) => {
      state.currentDeck = null;
    },

    //@ Reset the deck slice store
    resetDeckSliceStore: (state) => {
      state.decks = [];
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
      state.currentDeck = null;
    },
  },
  // Extra reducers
  extraReducers: (builder) => {
    builder
      // Handle the fetchAllUserDecks async thunk
      .addCase(fetchAllUserDecks.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
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
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error.message as string;
      })
      // Handle the getDeckByID async thunk
      .addCase(getDeckByID.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(getDeckByID.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.isError = false;
        state.currentDeck = action.payload as IWordDeck;
      })
      .addCase(getDeckByID.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error.message as string;
      })
      // Handle the createDeck async thunk
      .addCase(createDeck.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(createDeck.fulfilled, (state) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.isError = false;
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
        console.log(action.error);
        state.message = action.error.message as string;
      })

      /* WORD CASES */
      .addCase(createWord.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })

      .addCase(createWord.fulfilled, (state, action) => {
        state.currentDeck = action.payload.deck;
        state.message = action.payload.message;
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

      .addCase(deleteWordFromDeckByID.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })

      .addCase(deleteWordFromDeckByID.fulfilled, (state, action) => {
        console.log(action.payload.deck);
        state.currentDeck = action.payload.deck;
        state.isSuccess = true;
        state.isLoading = false;
        state.isError = false;
      })

      .addCase(deleteWordFromDeckByID.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.payload as string;
      });
  },
});

const { resetDeckSliceStore } = vocabSlice.actions;
const { setCurrentDeck } = vocabSlice.actions;
const { resetErrorState } = vocabSlice.actions;
const { resetDeckStatusFlagsToDefault } = vocabSlice.actions;
const { resetCurrentDeck } = vocabSlice.actions;

const VocabSliceService = {
  createDeck,
  fetchAllUserDecks,
  getDeckByID,
  deleteDeckByID,
  createWord,
  deleteWordFromDeckByID,
  setCurrentDeck,
  resetDeckSliceStore,
  resetErrorState,
  resetDeckStatusFlagsToDefault,
  resetCurrentDeck,
};

// Export the service
export { VocabSliceService };

// Export the reducer, which is used in the store
export default vocabSlice.reducer;
