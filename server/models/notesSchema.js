const mongoose = require("mongoose");

const notesSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, default: () => Date.now() },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
});

const NoteModel = mongoose.model("Note", notesSchema);

module.exports = NoteModel;
