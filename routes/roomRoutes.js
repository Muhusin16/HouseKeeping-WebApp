const express = require("express");
const router = express.Router();
const { createTask, updateTask } = require("../controllers/roomController");

router.post("/create/hall", createTask("hall"));
router.put("/update/hall/:id",  updateTask("hall"));

router.post("/create/kitchen",  createTask("kitchen"));
router.put("/update/kitchen/:id",  updateTask("kitchen"));

router.post("/create/reception",  createTask("reception"));
router.put("/update/reception/:id",  updateTask("reception"));

router.post("/create/conference",  createTask("conference"));
router.put("/update/conference/:id", updateTask("conference"));

router.post("/create/washroom",  createTask("washroom"));
router.put("/update/washroom/:id", updateTask("washroom"));

module.exports = router;
