import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ICreateNewDeck, IWord, IWordDeck } from "../interfaces/index";
import { ICreateNewVocabWord } from "../interfaces/index";
import { VocabService } from "./vocabService";

// Constants
const NAMESPACE = "vocabSlice.ts";
const DEBUGGING = false;

/*
  ***************************** 
  STATE INTERFACE / INITIAL STATE
  *****************************
*/
interface VocabState {
  decks: IWordDeck[] | [];
  currentDeck: IWordDeck | null;
  isDeckLoading: boolean;
  isWordLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  message: string;
}

const initialState: VocabState = {
  decks: [],
  currentDeck: null,
  isDeckLoading: false,
  isWordLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

/*
  ***************************** 
          DECK THUNKS 
  *****************************
*/

const fetchAllDecks = createAsyncThunk("vocab/fetchAllDecks", async (_, { rejectWithValue }) => {
  try {
    const response = await VocabService.fetchAllDecks();
    if (DEBUGGING) console.log(NAMESPACE, "fetchAllDecks response:", response);
    return response;
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return rejectWithValue(message);
  }
});

const fetchDeckByID = createAsyncThunk(
  "vocab/fetchDeckByID",
  async (deckId: string, { rejectWithValue }) => {
    try {
      const response = await VocabService.fetchDeckByID(deckId);
      if (DEBUGGING) console.log(NAMESPACE, "fetchDeckByID response:", response);
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
          WORD ASYNC THUNKS 
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

const updateWordInDeckByID = createAsyncThunk(
  "vocab/updateWordInDeckByID",
  async (word: IWord, { rejectWithValue }) => {
    try {
      const response = await VocabService.updateWordInDeckByID(word);
      if (DEBUGGING) console.log(NAMESPACE, "deleteWordByID response:", response);
      return response;
    } catch (error: any) {
      const errorMessage = error.message || "Failed to update word.";
      if (DEBUGGING) console.log(NAMESPACE, error);
      return rejectWithValue(errorMessage);
    }
  }
);

const toggleIsFavoriteOnWord = createAsyncThunk(
  "vocab/toggleIsFavoriteOnWord",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await VocabService.toggleIsFavoriteOnWord(id);
      if (DEBUGGING) console.log(NAMESPACE, "toggleIsFavoriteOnWord response:", response);
      return response;
    } catch (error: any) {
      const errorMessage = error.message || "Failed to update isFavorite.";
      if (DEBUGGING) console.log(NAMESPACE, error);
      return rejectWithValue(errorMessage);
    }
  }
);

/*
***************************** 
          SLICE               
*****************************
*/
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
      state.isDeckLoading = false;
      state.isWordLoading = false;
      state.message = "";
    },

    resetCurrentDeck: (state) => {
      state.currentDeck = null;
    },

    setVocabSliceToInitialState: (state) => {
      state.decks = [];
      state.isDeckLoading = false;
      state.isWordLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
      state.currentDeck = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createDeck.pending, (state) => {
        state.isDeckLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(createDeck.fulfilled, (state) => {
        state.isSuccess = true;
        state.isDeckLoading = false;
        state.isError = false;
      })
      .addCase(createDeck.rejected, (state, action) => {
        state.isError = true;
        state.isDeckLoading = false;
        state.isSuccess = false;
        state.message = action.error.message as string;
      })
      .addCase(fetchAllDecks.pending, (state) => {
        state.isDeckLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(fetchAllDecks.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isDeckLoading = false;
        state.isError = false;
        state.decks = action.payload;
        state.message = "";
      })
      .addCase(fetchAllDecks.rejected, (state, action) => {
        state.isError = true;
        state.isDeckLoading = false;
        state.isSuccess = false;
        state.message = action.error.message as string;
      })
      .addCase(fetchDeckByID.pending, (state) => {
        state.isDeckLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(fetchDeckByID.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isDeckLoading = false;
        state.isError = false;
        state.currentDeck = action.payload as IWordDeck;
      })
      .addCase(fetchDeckByID.rejected, (state, action) => {
        state.isError = true;
        state.isDeckLoading = false;
        state.isSuccess = false;
        state.message = action.error.message as string;
      })
      .addCase(deleteDeckByID.pending, (state) => {
        state.isDeckLoading = true;
      })
      .addCase(deleteDeckByID.fulfilled, (state) => {
        state.isSuccess = true;
        state.isDeckLoading = false;
      })
      .addCase(deleteDeckByID.rejected, (state, action) => {
        state.isError = true;
        state.isDeckLoading = false;
        state.isSuccess = false;
        state.message = action.error.message as string;
      })
      .addCase(createWord.pending, (state) => {
        state.isWordLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(createWord.fulfilled, (state, action) => {
        state.currentDeck = action.payload.deck;
        state.message = action.payload.message;
        state.isSuccess = true;
        state.isWordLoading = false;
        state.isError = false;
      })
      .addCase(createWord.rejected, (state, action) => {
        state.isError = true;
        state.isWordLoading = false;
        state.isSuccess = false;
        state.message = action.payload as string;
      })
      .addCase(deleteWordFromDeckByID.pending, (state) => {
        state.isWordLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(deleteWordFromDeckByID.fulfilled, (state, action) => {
        state.currentDeck = action.payload.deck;
        state.isSuccess = true;
        state.isWordLoading = false;
        state.isError = false;
      })
      .addCase(deleteWordFromDeckByID.rejected, (state, action) => {
        state.isError = true;
        state.isWordLoading = false;
        state.isSuccess = false;
        state.message = action.payload as string;
      })
      .addCase(updateWordInDeckByID.pending, (state) => {
        state.isWordLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.message = "Updating word...";
      })
      .addCase(updateWordInDeckByID.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isWordLoading = false;
        state.isError = false;
        state.currentDeck = action.payload.deck;
        state.message = action.payload.message;
      })
      .addCase(updateWordInDeckByID.rejected, (state, action) => {
        state.isError = true;
        state.isWordLoading = false;
        state.isSuccess = false;
        state.message = action.payload as string;
      })
      .addCase(toggleIsFavoriteOnWord.pending, (state) => {
        state.isWordLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.message = "Updating word...";
      })
      .addCase(toggleIsFavoriteOnWord.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isWordLoading = false;
        state.isError = false;
        state.currentDeck = action.payload.deck;
        state.message = action.payload.message;
      })
      .addCase(toggleIsFavoriteOnWord.rejected, (state, action) => {
        state.isError = true;
        state.isWordLoading = false;
        state.isSuccess = false;
        state.message = action.payload as string;
        // Current deck state is not updated, ie remains the same
      });
  },
});

const { setVocabSliceToInitialState } = vocabSlice.actions;
const { setCurrentDeck } = vocabSlice.actions;
const { resetErrorState } = vocabSlice.actions;
const { resetDeckStatusFlagsToDefault } = vocabSlice.actions;
const { resetCurrentDeck } = vocabSlice.actions;

const VocabSliceService = {
  createDeck,
  fetchAllDecks,
  fetchDeckByID,
  deleteDeckByID,
  createWord,
  deleteWordFromDeckByID,
  updateWordInDeckByID,
  setCurrentDeck,
  setVocabSliceToInitialState,
  resetErrorState,
  resetDeckStatusFlagsToDefault,
  resetCurrentDeck,
  toggleIsFavoriteOnWord,
};

// Export and expose the service functions to the components
export { VocabSliceService };

// Export the reducer, which is used in the app/store.ts file
export default vocabSlice.reducer;
