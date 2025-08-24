import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NoteDetailModal from "../../components/NoteDetailModal";
import { logout } from "../../data/account/accountSlice";
import { deleteNote, updateNote, addNote } from "../../data/notes/notesSlice";
import { RootState } from "../../data/store/store";
import { Note } from "../../models/Note";
import { useNavigate } from "react-router-dom";

const NotesPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const notes = useSelector((state: RootState) => state.notes);

  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    note: Note | null;
    isEdit: boolean;
  }>({
    isOpen: false,
    note: null,
    isEdit: false,
  });

  const handleAddClick = () => {
    setModalState({
      isOpen: true,
      note: { id: null, title: "", description: "" },
      isEdit: true,
    });
  };

  const handleView = (note: Note) => {
    setModalState({ isOpen: true, note, isEdit: false });
  };

  const handleEdit = (note: Note) => {
    setModalState({ isOpen: true, note, isEdit: true });
  };

  const handleDelete = (noteId: string) => {
    dispatch(deleteNote(noteId));
  };

  const handleSaveNote = (note: Note) => {
    if (note.id) {
      dispatch(updateNote(note));
    } else {
      const newNote = { ...note, id: Date.now().toString() };
      dispatch(addNote(newNote));
    }
    setModalState({ isOpen: false, note: null, isEdit: false });
  };

  const onLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", padding: "20px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h1>My Personal Notes</h1>
        <button onClick={onLogout}>Logout</button>
      </div>

      <button onClick={handleAddClick} style={{ alignSelf: "flex-end" }}>
        Add Note
      </button>

      <ul style={{ listStyleType: "none", padding: 0 }}>
        {notes.map((note) => (
          <li
            key={note.id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              margin: "10px 0",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span
              style={{ flex: 1, fontWeight: "bold", cursor: "pointer" }}
              onClick={() => handleView(note)}
            >
              {note.title}
            </span>
            <div style={{ display: "flex", gap: "5px" }}>
              <button onClick={() => handleView(note)}>View</button>
              <button onClick={() => handleEdit(note)}>Edit</button>
              <button onClick={() => handleDelete(note.id!)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>

      {modalState.isOpen && (
        <NoteDetailModal
          note={modalState.note}
          isEdit={modalState.isEdit}
          onClose={() =>
            setModalState({ isOpen: false, note: null, isEdit: false })
          }
          onSave={handleSaveNote}
        />
      )}
    </div>
  );
};

export default NotesPage;
