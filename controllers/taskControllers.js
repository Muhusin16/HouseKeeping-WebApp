const Task = require("../models/taskModels");

// Create a task in a specific room for a user
const createRoom = async (req, res) => {
  try {
    const { user_id, roomType, roomData } = req.body;

    const task = await Task.create({
      user_id,
      roomType,
      roomData,
    });

    res.status(201).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get tasks for a user in a specific room
const getRoomTasks = async (req, res) => {
  try {
    const { user_id } = req.params;

    const tasks = await Task.find({ user_id});

    if (!tasks || tasks.length === 0) {
      return res.status(404).json({ message: "No tasks found for the user and room" });
    }

    res.status(200).json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update tasks for a user in a specific room
const updateRoom = async (req, res) => {
  try {
    const { user_id, roomType, updatedData } = req.body;

    const task = await Task.findOneAndUpdate(
      { user_id, roomType },
      { roomData: updatedData },
      { new: true } // To return the updated task
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found for the user and room" });
    }

    res.status(200).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createRoom,
  updateRoom,
  getRoomTasks
};
