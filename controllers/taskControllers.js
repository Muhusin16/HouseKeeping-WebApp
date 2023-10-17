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

const getHall = async (req, res) => {
  try {
    const rooms = await Hall.find(); 
    res.json(rooms);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Rooms Not Found!" });
  }
};

const createKitchen = async (req, res) => {
  try {
    const { kitchenData } = req.body;

    const room = await Kitchen.create({
      kitchenData // Corrected to use kitchenData
    });

    res.status(201).json(room);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getKitchen = async (req, res) => {
  try {
    const rooms = await Kitchen.find();
    res.json(rooms);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Rooms Not Found!" });
  }
};

const createReception = async (req, res) => {
  try {
    const { receptionData } = req.body;

    const room = await Reception.create({
      receptionData // Corrected to use receptionData
    });

    res.status(201).json(room);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getReception = async (req, res) => {
  try {
    const rooms = await Reception.find();
    res.json(rooms);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Rooms Not Found!" });
  }
};

const createConference = async (req, res) => {
  try {
    const { conferenceData } = req.body;

    const room = await Conference.create({
      conferenceData // Corrected to use conferenceData
    });

    res.status(201).json(room);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


const getConference = async (req, res) => {
  try {
    const rooms = await Conference.find();
    res.json(rooms);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Rooms Not Found!" });
  }
};


const createWashroom = async (req, res) => {
  try {
    const { washroomData } = req.body;

    const room = await Washroom.create({
      washroomData // Corrected to use washroomData
    });

    res.status(201).json(room);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getWashroom = async (req, res) => {
  try {
    const rooms = await Washroom.find();
    res.json(rooms);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Rooms Not Found!" });
  }
};


module.exports = {
  createHall,
  createKitchen,
  createReception,
  createConference,
  createWashroom,
  getHall,
  getKitchen,
  getReception,
  getConference,
  getWashroom,
};
