const noteController = require("../controllers/noteController");
const verifyToken = require("../utils/verifyToken");

// This is like a route handler but for sockets event listeners.
const socketHandler = (socket, socketServer) => {
  socket.on("createNote", async (data) => {
    try {
      await verifyToken(data.token);
      noteController.createNote(data, socket, socketServer);
    } catch (error) {
      // If the user is not verified with his token I emit an "error" event to the client.
      socket.emit("error", error.message);
    }
  });
  // Getting all notes from the DB.
  socket.on("getAllNotes", () => {
    noteController.getAllNotes(socket, socketServer);
  });
  // Delete a note from the DB.
  socket.on("deleteNote", async (data) => {
    try {
      await verifyToken(data.token);
      noteController.deleteNote(data, socket, socketServer);
    } catch (error) {
      // If the user is not verified with his token I emit an "error" event to the client.
      socket.emit("error", error.message);
    }
  });

  socket.on("editStatus", async (data) => {
    try {
      await verifyToken(data.token);
      noteController.editStatus(data, socket, socketServer);
    } catch (error) {
      socket.emit("error", error.message);
    }
  });
};

module.exports = socketHandler;
