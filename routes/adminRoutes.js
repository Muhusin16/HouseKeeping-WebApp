const express = require('express');
const router = express.Router();

const { getAllUsers, adminUser, getUserById, updateUser, deleteUser} = require('../controllers/adminController');
const isAdmin = require("../middleware/adminHandler")

//const { getRoomByUserId } = require('../controllers/roomController')

router.post("/admin", adminUser);

//router.get('/rooms/:user_id', getRoomByUserId);

router.get('/users',isAdmin,  getAllUsers);

router.get('/users/:id', isAdmin, getUserById);

router.put('/users/:id', updateUser);

router.delete('/users/:id', isAdmin, deleteUser);




module.exports = router;
