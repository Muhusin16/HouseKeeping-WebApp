const express = require("express");

const router = express.Router();
const {createRoom, getallRoom, getoneRoom, updateRoom, deleteRoom   } = require("../controllers/taskControllers")

const isAdmin = require("../middleware/adminHandler")

//router.post('/complete-task/:taskId', completeTask)

router.post('/createroom', createRoom)

router.get('/getallroom',isAdmin, getallRoom)

router.get('/getoneroom/:roomId', getoneRoom)

router.put('/updateroom/:roomId', updateRoom)

router.delete('/deleteroom/:roomId', deleteRoom)

module.exports = router

