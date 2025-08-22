import React from "react";

interface Note {
  id: number;
  title: string;
  description: string;
}

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
  note,
  onClose,
  isEditMode = false,
}: {
  note: Note;
  onClose: () => void;
  isEditMode?: boolean;
}) => {
  console.log("NoteDetailModal rendered with note:", note);
  return (
    <div style={modalOverlayStyle}>
      <div style={modalContentStyle}>
        <button
          onClick={onClose}
          style={{ position: "absolute", top: "10px", right: "10px" }}
        >
          &times;
        </button>
        {isEditMode ? (
          <input
            name="description"
            placeholder="Note Description"
            value={note.description || ""}
            onChange={(e) => {
              // Handle description change if needed
            }}
            required
          ></input>
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
