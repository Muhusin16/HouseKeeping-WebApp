const { Hall, Kitchen, Reception, Conference, Washroom } = require("../models/taskModels");

// Create a room and add tasks
const createHall = async (req, res) => {
  try {
    const { hallData } = req.body;

    const room = await Hall.create({
      hallData
    });

    res.status(201).json(room);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const createKitchen = async (req, res) => {
  try {
    const { kitchenData} = req.body;

    const room = await Kitchen.create({
      kitchenData
    });

    res.status(201).json(room);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
const createReception = async (req, res) => {
  try {
    const {receptionData} = req.body;

    const room = await Reception.create({
      receptionData
    });

    res.status(201).json(room);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const createConference =  async (req, res) => {
  try {
    const { conferenceData } = req.body;

    const room = await Conference.create({
      conferenceData
    });

    res.status(201).json(room);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const createWashroom = async (req, res) => {
  try {
    const { washroomData } = req.body;

    const room = await Washroom.create({
      washroomData
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
    res.json(room.hallData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Room Not Found!" });
  }
};
const getkitchen = async (req, res) => {
  try {
    const room = await Kitchen.findOne();
    res.json(room.tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Room Not Found!" });
  }
};

const getreception =  async (req, res) => {
  try {
    const room = await Reception.findOne();
    res.json(room.tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: -"Room Not Found!" });
  }
};

const getConference =  async (req, res) => {
  try {
    const room = await Conference.findOne();
    res.json(room.tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Room Not Found!" });
  }
};

const getWashroom = async (req, res) => {
  try {
    const room = await Washroom.findOne();
    res.json(room.tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Room Not Found!" });
  }
};

module.exports = {createHall, createKitchen,createConference, createReception, createWashroom, getHall, getConference,getWashroom, getreception, getkitchen };

