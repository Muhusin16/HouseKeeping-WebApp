
const { Hall, Kitchen, Reception, Conference, Washroom } = require("../models/taskModels");

// Create a room and add tasks
const createHall = async (req, res) => {
  try {
    const { taskName, taskDuration, isCompleted } = req.body;

    const room = await Hall.create({
      tasks: { taskName, taskDuration, isCompleted }
    });

    res.status(201).json(room);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const createKitchen = async (req, res) => {
  try {
    const { taskName, taskDuration, isCompleted } = req.body;

    const room = await Kitchen.create({
      tasks: { taskName, taskDuration, isCompleted }
    });

    res.status(201).json(room);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
const createReception = async (req, res) => {
  try {
    const { taskName, taskDuration, isCompleted } = req.body;

    const room = await Reception.create({
      tasks: { taskName, taskDuration, isCompleted }
    });

    res.status(201).json(room);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const createConference =  async (req, res) => {
  try {
    const { taskName, taskDuration, isCompleted } = req.body;

    const room = await Conference.create({
      tasks: { taskName, taskDuration, isCompleted }
    });

    res.status(201).json(room);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const createWashroom = async (req, res) => {
  try {
    const { taskName, taskDuration, isCompleted } = req.body;

    const room = await Washroom.create({
      tasks: { taskName, taskDuration, isCompleted }
    });

    res.status(201).json(room);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get tasks for a specific room
const getHall = async (req, res) => {
  try {
    const room = await Hall.findOne();
    res.json(room.tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
const getkitchen = async (req, res) => {
  try {
    const room = await Kitchen.findOne();
    res.json(room.tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getreception =  async (req, res) => {
  try {
    const room = await Reception.findOne();
    res.json(room.tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getConference =  async (req, res) => {
  try {
    const room = await Conference.findOne();
    res.json(room.tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getWashroom = async (req, res) => {
  try {
    const room = await Washroom.findOne();
    res.json(room.tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {createHall, createKitchen,createConference, createReception, createWashroom, getHall, getConference,getWashroom, getreception, getkitchen };

