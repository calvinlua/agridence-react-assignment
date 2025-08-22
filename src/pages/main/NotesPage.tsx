import React from "react";
import { useNavigate } from "react-router-dom";
import NoteDetailModal from "../../components/NoteDetailModal";
interface Note {
  id: number;
  title: string;
  description: string;
}

const NotesPage = () => {
  const navigate = useNavigate();

  const [notes, setNotes] = React.useState<Note[]>([
    { id: 1, title: "First Note", description: "This is the first note." },
    { id: 2, title: "Second Note", description: "This is the second note." },
  ]);
  const [noteForm, setNoteForm] = React.useState<Note>({} as Note);
  const [selectedNote, setSelectedNote] = React.useState<Note | undefined>(
    undefined
  );
  console.log(selectedNote);
  const handleEdit = (note: Note) => {};
  const handleDelete = (noteId: number) => {};
  const handleSubmit = (e: React.FormEvent) => e.preventDefault();
  const onLogout = () => {
    navigate("/");
  };
  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    // Basic handler for form inputs
    setNoteForm({ ...noteForm, [e.target.name]: e.target.value });
  };

  return (
    <div style={{ display: "flex", gap: "20px", padding: "20px" }}>
      <div style={{ flex: 1 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <h2>My Personal Notes</h2>
          <button onClick={onLogout}>Logout</button>
        </div>

        {/* Create/Edit Form */}
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            marginBottom: "20px",
          }}
        >
          <input
            type="text"
            name="title"
            placeholder="Note Title"
            value={noteForm.title || ""}
            onChange={handleFormChange}
            required
          />
          <textarea
            name="description"
            placeholder="Note Description"
            value={noteForm.description || ""}
            onChange={handleFormChange}
            required
          />
          <button type="submit">
            {noteForm.id ? "Update Note" : "Add Note"}
          </button>
        </form>

        {/* Notes List */}
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {notes.map((note: Note) => (
            <li
              key={note.id}
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                marginBottom: "10px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div style={{ flex: 1, cursor: "pointer" }}>
                <span
                  onClick={() => setSelectedNote(note)}
                  style={{ fontWeight: "bold" }}
                >
                  {note.title}
                </span>
              </div>
              <div style={{ display: "flex", gap: "5px" }}>
                <button onClick={() => handleEdit(note)}>Edit</button>
                <button onClick={() => handleDelete(note.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Note Detail Modal - for Option 1 */}
      {selectedNote && (
        <NoteDetailModal
          note={selectedNote}
          onClose={() => setSelectedNote(undefined)}
        />
      )}
    </div>
  );
};

export default NotesPage;
