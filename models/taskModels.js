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
}, { timestamps: true });

const Room = mongoose.model("Room", roomSchema);

// Predefined tasks for each room
const predefinedTasks = {
  hall: [
    { taskName: "Floor Carpet", taskDuration: "N/A", isCompleted: false },
    { taskName: "Monitor", taskDuration: "N/A", isCompleted: false },
    { taskName: "Bulb", taskDuration: "N/A", isCompleted: false },
    { taskName: "Tables & Chair", taskDuration: "N/A", isCompleted: false },
  ],
  kitchen: [
    { taskName: "Fridge", taskDuration: "N/A", isCompleted: false },
    { taskName: "Dishes", taskDuration: "N/A", isCompleted: false },
    { taskName: "Microwave", taskDuration: "N/A", isCompleted: false },
    { taskName: "Water", taskDuration: "N/A", isCompleted: false },
    { taskName: "Sink", taskDuration: "N/A", isCompleted: false },
  ],
  reception: [
    { taskName: "Sofa", taskDuration: "N/A", isCompleted: false },
    { taskName: "TV", taskDuration: "N/A", isCompleted: false },
    { taskName: "Dining Table", taskDuration: "N/A", isCompleted: false },
    { taskName: "Empty Area", taskDuration: "N/A", isCompleted: false },
    { taskName: "Floor", taskDuration: "N/A", isCompleted: false },
  ],
  washroom: [
    { taskName: "Tissue", taskDuration: "N/A", isCompleted: false },
    { taskName: "Mirror", taskDuration: "N/A", isCompleted: false },
    { taskName: "Mop", taskDuration: "N/A", isCompleted: false },
    { taskName: "Dust Bin", taskDuration: "N/A", isCompleted: false },
  ],
};

// Initialize rooms with predefined tasks
for (const roomName in predefinedTasks) {
  const room = new Room({ roomName, tasks: predefinedTasks[roomName] });
  room.save();
}

module.exports = Room;


