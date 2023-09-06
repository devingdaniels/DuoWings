import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./userAuthService";
import type { RootState } from "../app/store";

interface User {
  _id: string;
  fname: string;
  lname: string;
  email: string;
  phonenumber: string;
  role: "user" | "admin";
  // Add props for words and dialogue
}

export interface UserState {
  user: User | null;
  isSuccess: boolean;
  isLoading: boolean;
  isError: boolean;
  message: string;
}

const initialState: UserState = {
  user: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

// Create an async thunk for user login
export const login = createAsyncThunk<
  User,
  { email: string; password: string }
>("auth/login", async (userData, { rejectWithValue }) => {
  try {
    return await authService.login(userData);
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return rejectWithValue(message);
  }
});

export const register = createAsyncThunk<
  User,
  {
    fname: string;
    lname: string;
    email: string;
    phonenumber: string;
    password: string;
    confirmPassword: string;
  }
>("auth/register", async (userData, { rejectWithValue }) => {
  try {
    return await authService.register(userData);
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return rejectWithValue(message);
  }
});

// Create the user slice with reducers
const userAuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isSuccess = false;
      state.isLoading = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.message = "Loading User";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.isError = false;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.message = "Loading User";
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.isError = false;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload as string;
      });
  },
});

export const { reset } = userAuthSlice.actions;
export const selectUser = (state: RootState) => state.auth;
export default userAuthSlice.reducer;