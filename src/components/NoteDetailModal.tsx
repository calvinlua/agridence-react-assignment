import React from "react";
import { Note } from "../models/Note";

const modalOverlayStyle: React.CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 9999, // Make sure it is on top of everything
};

const modalContentStyle: React.CSSProperties = {
  backgroundColor: "white",
  padding: "20px",
  borderRadius: "5px",
  maxWidth: "500px",
  width: "90%",
  position: "relative",
};

const closeButtonStyle: React.CSSProperties = {
  position: "absolute",
  top: "10px",
  right: "10px",
  background: "transparent",
  border: "none",
  fontSize: "1.5rem",
  cursor: "pointer",
};

const NoteDetailModal = ({
  initialNote,
  onClose,
  isEditMode = false,
}: {
  initialNote: Note;
  onClose: () => void;
  isEditMode?: boolean;
}) => {
  const [note, setNote] = React.useState<Note>(initialNote);

  const handleSubmit = (e: React.FormEvent) => {};

  return (
    <div style={modalOverlayStyle}>
      <div style={modalContentStyle}>
        <button onClick={onClose} style={closeButtonStyle}>
          &times;
        </button>
        {isEditMode ? (
          <div>
            <h2>Edit Note</h2>
            {/* Inputs for editing the note */}
            <form
              style={{
                display: "flex",
                flexDirection: "column",
                // gap: "10px",
                marginBottom: "20px",
              }}
            >
              <div>
                <input
                  name="title"
                  placeholder="Note Title"
                  value={note.title || ""}
                  onChange={(e) => {
                    // Handle title change if needed
                    const updatedNote = { ...note, title: e.target.value }; // Create a new object
                    setNote(updatedNote); // Update the state with the new note object
                    console.log("Title changed to:", e.target.value);
                    note.title = e.target.value; // Update the note title
                    console.log("Updated note:", note);

                    // TODO: dispatch an action or call a function to save the updated note
                  }}
                  style={{
                    flex: 1,
                    width: "100%",
                    marginTop: "10px",
                    padding: "10px",
                    boxSizing: "border-box", // Ensure padding is included in width
                    resize: "none", // Prevent resizing
                    maxWidth: "100%", // Ensure it doesn't overflow
                  }}
                  required
                />
                <p style={{ fontSize: "10px", justifySelf: "flex-end" }}>
                  {50 - (note.title?.length || 0)}/ 50 characters remaining
                </p>
              </div>
              <div>
                <textarea
                  name="description"
                  placeholder="Note Description"
                  value={note.description || ""}
                  rows={5}
                  style={{
                    width: "100%",
                    height: "250px", // Fixed height
                    marginTop: "10px",
                    resize: "none", // Prevent resizing
                    maxWidth: "100%", // Ensure it doesn't overflow
                    overflowY: "auto", // Add scroll if content overflows
                    overflowX: "hidden", // Hide horizontal overflow
                  }}
                  onChange={(e) => {
                    // Handle description change if needed

                    const updatedNote = {
                      ...note,
                      description: e.target.value,
                    }; // Create a new object
                    setNote(updatedNote); // Update state

                    console.log("Description changed to:", e.target.value);
                    note.description = e.target.value; // Update the note description
                    console.log("Updated note:", note);
                    // TODO: dispatch an action or call a function to save the updated note
                  }}
                  required
                />
                <p style={{ fontSize: "10px", justifySelf: "flex-end" }}>
                  {1500 - (note.description?.length || 0)} / 1500 characters
                  remaining
                </p>
              </div>

              <button
                type="submit"
                onSubmit={handleSubmit}
                style={{
                  width: "100px",
                  alignSelf: "center",
                  marginTop: "10px",
                }}
              >
                Save
              </button>
            </form>
          </div>
        ) : (
          <div>
            <h3>{note.title}</h3>
            <p>{note.description}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NoteDetailModal;
