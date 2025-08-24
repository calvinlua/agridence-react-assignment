import React, { useState } from "react";
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
  zIndex: 9999,
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

interface NoteDetailModalProps {
  note: Note | null;
  isEdit: boolean;
  onClose: () => void;
  onSave: (note: Note) => void;
}

const NoteDetailModal: React.FC<NoteDetailModalProps> = ({
  note,
  isEdit,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState<Note>(
    note || { id: null, title: "", description: "" }
  );

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title.trim() && formData.description.trim()) {
      onSave(formData);
    }
  };

  return (
    <div style={modalOverlayStyle}>
      <div style={modalContentStyle}>
        <button onClick={onClose} style={closeButtonStyle}>
          &times;
        </button>
        {isEdit ? (
          <div>
            <h2>{formData.id ? "Edit Note" : "Add Note"}</h2>
            <form
              onSubmit={handleSubmit}
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <input
                name="title"
                placeholder="Note Title"
                value={formData.title}
                onChange={handleFormChange}
                required
                style={{
                  width: "100%",
                  padding: "10px",
                  boxSizing: "border-box",
                }}
              />
              <textarea
                name="description"
                placeholder="Note Description"
                value={formData.description}
                onChange={handleFormChange}
                rows={5}
                required
                style={{
                  width: "100%",
                  padding: "10px",
                  boxSizing: "border-box",
                  resize: "none",
                }}
              />
              <button
                type="submit"
                style={{ alignSelf: "center", width: "100px" }}
              >
                Save
              </button>
            </form>
          </div>
        ) : (
          <div>
            <h2>{note?.title}</h2>
            <p>{note?.description}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NoteDetailModal;
