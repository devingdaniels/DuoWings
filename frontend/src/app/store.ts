import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";

// Reducers
import userAuthReducer from "../features/userAuthSlice";
import vocabReducer from "../features/vocabSlice";

// Redux Persist
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

// Root reducer
const appReducer = combineReducers({
  auth: userAuthReducer,
  vocab: vocabReducer,
});

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

// Create a persisted reducer with Redux Persist
const persistedReducer = persistReducer(persistConfig, appReducer);

// Create the Redux store with the persisted reducer and default middleware
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Create a persisted store
export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
