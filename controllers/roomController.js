const { HallTask, KitchenTask, ReceptionTask, ConfernceTask, WashroomTask } = require("../models/roomModel");

const createTask = (roomType) => async (req, res) => {
  try {
    let newTask;

    switch (roomType) {
      case "hall":
        newTask = new HallTask({ roomType, roomData: req.body });
        break;
      case "kitchen":
        newTask = new KitchenTask({ roomType, roomData: req.body });
        break;
      case "reception":
        newTask = new ReceptionTask({ roomType, roomData: req.body });
        break;
      case "conference":
        newTask = new ConfernceTask({ roomType, roomData: req.body });
        break;     
      case "washroom":
        newTask = new WashroomTask({ roomType, roomData: req.body });
        break;
      default:
        return res.status(400).json({ message: "Invalid roomType" });
    }

    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


const updateTask = (roomType) => async (req, res) => {
  const taskId = req.params.id;
  try {
    let updatedTask;

    switch (roomType) {
      case "hall":
        updatedTask = await HallTask.findByIdAndUpdate(taskId, req.body, { new: true });
        break;
      case "kitchen":
        updatedTask = await KitchenTask.findByIdAndUpdate(taskId, req.body, { new: true });
        break;
        case "reception":
          updatedTask = await ReceptionTask.findByIdAndUpdate(taskId, req.body, { new: true });
          break;
        case "conference":
        updatedTask = await ConfernceTask.findByIdAndUpdate(taskId, req.body, { new: true });
        break;
        case "washroom":
        updatedTask = await WashroomTask.findByIdAndUpdate(taskId, req.body, { new: true });
        break;
      default:
        return res.status(400).json({ message: "Invalid roomType" });
    }

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

      res.status(200).json(updatedTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { createTask, updateTask};