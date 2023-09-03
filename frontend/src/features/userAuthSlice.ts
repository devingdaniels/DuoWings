import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../app/store";

interface User {
  _id: string;
  fname: string;
  lname: string;
  email: string;
  phonenumber: string;
  role: "user" | "admin";
  profilePicture: string;
  dialogues: string[]; // Array of dialogue IDs
  vocabulary: string[]; // Array of WordSet IDs
}

export interface UserState {
  currentUser: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  currentUser: null,
  loading: false,
  error: null,
};
