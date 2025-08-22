//store for react redux

import userReducer from "./slices/userSlice";
import notesReducer from "./slices/notesSlice";
import settingsReducer from "./slices/settingsSlice";
import authReducer from "./slices/authSlice";
import themeReducer from "./slices/themeSlice";
import notificationsReducer from "./slices/notificationsSlice";
import tagsReducer from "./slices/tagsSlice";

import { createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

import rootReducer from "./reducers";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default () => {
  let store = createStore(persistedReducer);
  let persistor = persistStore(store);
  return { store, persistor };
};
