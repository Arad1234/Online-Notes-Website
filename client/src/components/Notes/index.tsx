import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddNote from "./AddNote";
import "./index.scss";
import { Socket, io } from "socket.io-client";
import { socketEvents } from "../../helpers/socketEvents";

export interface Note {
  title: string;
  description: string;
  createdAt: Date;
  status: boolean;
  _id: number;
}

const Notes = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const socket: Socket = io("http://localhost:3000", { auth: { token } });

      socket.on("connect_error", (err) => {
        localStorage.removeItem("token");
        navigate("/login");
        alert(err);
      });

      // First initialize all the sockets event listeners so I can later emit events to them from the server.
      socketEvents(socket, setNotes, navigate);
      // First event to get all the notes. This event will trigger the event in the server that will trigger the event inside of the "socketEvents" function.
      socket.emit("getAllNotes");

      setSocket(socket);

      return () => {
        // This function automatically remove all listeneres that were added to the socket.
        socket.disconnect();
      };
    } else {
      navigate("/login");
    }
  }, []);

  const handleDeleteNote = (noteId: number) => {
    const token = localStorage.getItem("token");
    socket?.emit("deleteNote", { noteId, token });
  };

  const handleStatusChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    noteId: number
  ) => {
    const token = localStorage.getItem("token");
    // Emiting an event name "editStatus" to the server.
    socket?.emit("editStatus", {
      noteId: noteId,
      statusValue: e.target.checked,
      token: token,
    });
  };
  return (
    <div>
      <AddNote socket={socket} />
      <div className="all-notes-container">
        <h1>All Notes</h1>
        {notes.map((note) => {
          return (
            <div
              className="note-container"
              key={note._id}
            >
              <input
                type="checkbox"
                checked={note.status}
                onChange={(e) => handleStatusChange(e, note._id)}
              />
              <div>{note.title}</div>
              <div>{note.description}</div>
              <div>{note.createdAt.toString()}</div>
              <button onClick={() => handleDeleteNote(note._id)}>Delete</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Notes;
