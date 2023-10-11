const express = require('express');
const router = express.Router();
const { getAllUsers, adminUser } = require('../controllers/adminController');
const isAdmin = require("../middleware/adminHandler")

router.post("/admin", adminUser);
router.get('/users',isAdmin,  getAllUsers);

module.exports = router;
