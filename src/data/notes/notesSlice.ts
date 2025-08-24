import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Note } from "../../models/Note";

const initialState: Note[] = [];

export const notesSlice = createSlice({
  name: "notes",
  initialState: initialState,
  reducers: {
    addNote: (state, action: PayloadAction<Note>) => {
      state.push(action.payload);
    },
    updateNote: (state, action: PayloadAction<Note>) => {
      const index = state.findIndex(
        (note: Note) => note.id === action.payload.id
      );
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    deleteNote: (state, action: PayloadAction<string>) => {
      return state.filter((note: Note) => note.id !== action.payload);
    },
  },
});

export const { addNote, updateNote, deleteNote } = notesSlice.actions;
export default notesSlice.reducer;
