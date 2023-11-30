const express = require('express');
const router = express.Router();
const { getAllUsers, adminUser, getUserById, updateUser, deleteUser} = require('../controllers/adminController');
const isAdmin = require("../middleware/adminHandler")

router.post("/login",isAdmin, adminUser);

router.get('/users',isAdmin,  getAllUsers);

router.get('/users/:id', isAdmin, getUserById);

router.put('/users/:id', updateUser);

router.delete('/users/:id', isAdmin, deleteUser);

module.exports = router;