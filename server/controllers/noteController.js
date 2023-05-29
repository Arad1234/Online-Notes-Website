const NoteModel = require("../models/notesSchema");
const noteController = {
  getAllNotes: async (socket, socketServer) => {
    try {
      // Getting the notes of the logged in user - not someone else's notes.
      const allNotes = await NoteModel.find({ userId: socket.user.userId });
      // Using the socketServer server instance to emit the events to all connected clients.
      socketServer.emit("recievedNotes", {
        status: "ok",
        notes: allNotes,
      });
    } catch (error) {
      socket.emit("error", error.message);
    }
  },
  createNote: async (data, socket, socketServer) => {
    const { title, description } = data;
    try {
      const newNote = await NoteModel.create({
        title: title,
        description: description,
        userId: socket.user.userId,
      });
      // Using the socketServer server instance to emit the events to all connected clients.
      socketServer.emit("addedSuccessfully", {
        status: "ok",
        newNote: newNote,
      });
    } catch (error) {
      socket.emit("error", error.message);
    }
  },
  deleteNote: async (data, socket, serverSocket) => {
    const { noteId } = data;
    try {
      const noteToDelete = await NoteModel.findOne({ _id: noteId });

      await noteToDelete.deleteOne();

      serverSocket.emit("noteDeleted", {
        status: "ok",
        taskId: noteToDelete._id,
      });
    } catch (error) {
      socket.emit("error", error);
    }
  },
};

module.exports = noteController;
