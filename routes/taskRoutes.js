const express = require("express");
const router = express.Router();

const { createRoom, updateRoom , getRoomTasks, getUserTasksByDate} = require("../controllers/taskControllers");

router.post("/create", createRoom);

router.put("/update", updateRoom);

router.get("/getTask/:user_id", getRoomTasks)

router.get("/getTasksByDate/:user_id/:date", getUserTasksByDate);

module.exports = router;
