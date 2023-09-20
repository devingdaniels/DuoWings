import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../app/store";
import deckService from "./deckService";

interface Deck {
  _id: string;
}

export interface DeckState {
  deck: Deck | null;
  isSuccess: boolean;
  isLoading: boolean;
  isError: boolean;
  message: string;
}

const initialState: DeckState = {
  deck: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

/* 
* TODO*: 
    - Create a thunk to fetch a deck from the backen
    - Create a thunk to create a deck in the backend
    - Create a thunk to update a deck in the backend
    - Create a thunk to delete a deck in the backend
    - Create a thunk to fetch all decks from the backend


*/

const deckSlice = createSlice({
  name: "deck",
  initialState,
  reducers: {
    reset: (state) => {},
  },
  extraReducers: (builder) => {},
});

export default deckSlice.reducer;
