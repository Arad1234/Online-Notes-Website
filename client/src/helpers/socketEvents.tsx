import { SetStateAction } from "react";
import { Socket } from "socket.io-client";
import { Note } from "../components/Notes"; // Importing the interface.

// Here I store all my socket event listeners so I can create on the initial render with the useEffect and after the "socket" instance is initialized properly.
export const socketEvents = (
  socket: Socket,
  setNotes: React.Dispatch<SetStateAction<Note[]>>
) => {
  socket?.on("addedSuccessfully", (data) => {
    setNotes((currentNotes) => [...currentNotes, data.newNote]);
  });

  socket?.on("error", (err) => {
    alert(err);
  });

  socket?.on("recievedNotes", (data) => {
    console.log(data.notes);
    setNotes(data.notes);
  });

  socket?.on("noteDeleted", (data) => {
    console.log(data);
    setNotes((currentNotes) =>
      currentNotes.filter((task) => task._id !== data.taskId)
    );
  });
};
