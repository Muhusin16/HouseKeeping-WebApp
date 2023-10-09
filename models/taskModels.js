const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  taskName: String,
  taskDuration: String,
  isCompleted: Boolean,
});

const roomSchema = new mongoose.Schema({
  roomName: {
    type: String,
    required: true,
    enum: ["hall", "kitchen", "reception", "conference", "washroom"],
  },
  tasks: [taskSchema],
});

const Room = mongoose.model("Room", roomSchema);

module.exports = Room;

