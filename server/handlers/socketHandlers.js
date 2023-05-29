const noteController = require("../controllers/noteController");

// This is like a route handler but for sockets event listeners.
const socketHandler = (socket, socketServer) => {
  socket.on("createNote", (data) => {
    noteController.createNote(data, socket, socketServer);
  });

  socket.on("getAllNotes", () => {
    noteController.getAllNotes(socket, socketServer);
  });

  socket.on("deleteNote", (data) => {
    noteController.deleteNote(data, socket, socketServer);
  });
};

module.exports = socketHandler;
