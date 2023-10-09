const Room = require("../models/taskModels")
const completeTask = async (req, res) => {
  const { roomId, taskId } = req.body;

  try {
    
    console.log("Received roomId:", roomId);

    const room = await Room.findById(roomId);

    if (!room) {
      const roomIdsInDatabase = await Room.find().select("_id");
      console.log("Room IDs in the database:", roomIdsInDatabase);

      return res.status(404).json({ message: "Room not found" });
    }

    const task = room.tasks.id(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    task.isCompleted = true;
    await room.save();

    res.status(200).json({ message: "Task marked as completed" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {completeTask};








      