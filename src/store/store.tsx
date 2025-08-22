//store for react redux

import { createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

const persistConfig = {
  key: "root",
  storage,
};

const notes = [
  { id: 1, content: "First note" },
  { id: 2, content: "Second note" },
];

interface State {
  notes: { id: number; content: string }[];
}

const rootReducer = (state: State = { notes: [] }, action: any) => {
  switch (action.type) {
    case "ADD_NOTE":
      return {
        ...state,
        notes: [...(state.notes || []), action.payload],
      };
    case "REMOVE_NOTE":
      return {
        ...state,
        notes: (state.notes || []).filter(
          (note: any) => note.id !== action.payload
        ),
      };
    default:
      return state;
  }
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default () => {
  let store = createStore(persistedReducer);
  let persistor = persistStore(store);
  return { store, persistor };
};
