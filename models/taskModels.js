const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  roomType: {
    type: String,
    enum: ["hall", "kitchen", "reception", "conference", "washroom"],
    required: true,
  },
  roomData: []
  
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
