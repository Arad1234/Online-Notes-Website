import { SetStateAction } from "react";
import { Socket } from "socket.io-client";
import { Note } from "../components/Notes"; // Importing the interface.
import { NavigateFunction } from "react-router-dom";

// Here I store all my socket event listeners so I can create on the initial render with the useEffect and after the "socket" instance is initialized properly.
export const socketEvents = (
  socket: Socket,
  setNotes: React.Dispatch<SetStateAction<Note[]>>,
  navigate: NavigateFunction
) => {
  socket?.on("addedSuccessfully", (data) => {
    setNotes((currentNotes) => [...currentNotes, data.newNote]);
  });

  socket?.on("error", (err) => {
    if (err === "Authorization error") {
      navigate("/login");
    }
    alert(err);
  });

  socket?.on("recievedNotes", (data) => {
    console.log(data.notes);
    setNotes(data.notes);
  });

  socket?.on("statusChanged", (data) => {
    setNotes((currentNotes) =>
      currentNotes.map((note) => {
        if (note._id === data.noteId) {
          note.status = data.newStatus;
          return note;
        }
        return note;
      })
    );
  });

  socket?.on("noteDeleted", (data) => {
    console.log(data);
    setNotes((currentNotes) =>
      currentNotes.filter((task) => task._id !== data.taskId)
    );
  });
};
