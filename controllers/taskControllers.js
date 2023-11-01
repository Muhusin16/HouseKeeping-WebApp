const Task = require("../models/taskModels");

const createRoom = async (req, res) => {
  try {
    const { user_id, roomType, roomData } = req.body;

    const existingUser = await Task.findOne({ user_id, roomType });

    if (existingUser) {
      // User already exists for this room, room data will be updated
      existingUser.roomData = roomData;
      await existingUser.save();
      res.status(200).json(existingUser);
    } else {
      // if User doesn't exist for this room, creating a new room
      const newTask = await Task.create({
        user_id,
        roomType,
        roomData,
        
      });
      res.status(201).json(newTask);
    }
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

    if (!tasks) {
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
      { new: true } 
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

const getUserTasksByDate = async (req, res) => {
  try {
    const { user_id} = req.params;

    // Define the start and end date for the query (from midnight to midnight)
    //const startDate = new Date(date);
    //startDate.setHours(0, 0, 0, 0);
    //const endDate = new Date(date);
    //endDate.setHours(23, 59, 59, 999);

    const tasks = await Task.find({
      user_id,
    });

    if (!tasks) {
      return res.status(404).json({ message: "No tasks found for the user and date" });
    }

    res.status(200).json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createRoom,
  updateRoom,
  getRoomTasks,
  getUserTasksByDate, 
};