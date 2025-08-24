import React, { useState } from "react";
import { Note } from "../../models/Note";
import "./NoteDetailModal.css";

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
    <div className="modal-overlay">
      <div className="modal-content">
        <button onClick={onClose} className="close-button">
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
                className="modal-input"
              />
              <textarea
                name="description"
                placeholder="Note Description"
                value={formData.description}
                onChange={handleFormChange}
                rows={5}
                required
                className="modal-textarea"
              />
              <button type="submit" className="modal-button">
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
