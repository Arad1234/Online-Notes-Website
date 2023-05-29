import React, { useState } from "react";
import { Socket } from "socket.io-client";
interface AddNoteProps {
  socket: Socket | null;
}
interface NoteDetails {
  title: string;
  description: string;
}
const AddNote = ({ socket }: AddNoteProps) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [noteDetails, setNoteDetails] = useState<NoteDetails>({
    title: "",
    description: "",
  });
  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    // Emitting an event name "createNote" to the server.
    socket?.emit("createNote", {
      title: noteDetails.title,
      description: noteDetails.description,
    });
  };

  return (
    <div>
      <button onClick={() => setShowModal(!showModal)}>Create new note</button>
      {showModal && (
        <form onSubmit={handleAddNote}>
          <label>title: </label>
          <input
            type="text"
            onChange={(e) =>
              setNoteDetails({ ...noteDetails, title: e.target.value })
            }
          />
          <label>description: </label>
          <input
            type="text"
            onChange={(e) =>
              setNoteDetails({ ...noteDetails, description: e.target.value })
            }
          />

          <button type="submit">Add Note!</button>
        </form>
      )}
    </div>
  );
};

export default AddNote;
