//store for react redux

import { combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import AccountReducer from "../account/accountSlice";
import NotesReducer from "../notes/notesSlice";
import { configureStore } from "@reduxjs/toolkit";

const persistConfig = {
  key: "root",
  storage: storage, // store in localStorage
  whitelist: ["notes"],
};

const appReducer = combineReducers({
  account: AccountReducer,
  notes: NotesReducer,
});

const persistedReducer = persistReducer(persistConfig, appReducer);

export const store = configureStore({
  // Create a store with the combined reducers
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }), // Disable serializable check for persist
});

export const persistor = persistStore(store);

// Export the store and persistor for use in the application
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
