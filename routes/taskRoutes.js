const express = require("express");
const router = express.Router();

const { createRoom, updateRoom , getRoomTasks} = require("../controllers/taskControllers");

// Create a task in the Hall
router.post("/create", createRoom);

// Update a task in the Hall
router.put("/update", updateRoom);

router.get("/getTask/:id", getRoomTasks)

module.exports = router;
