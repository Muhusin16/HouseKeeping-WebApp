const express = require("express");

const router = express.Router();

const {completeTask } = require("../controllers/taskControllers")

const {validateToken} = require("../middleware/validatetokenHandler")

router.post('/completeTask',validateToken, completeTask)

module.exports = router

