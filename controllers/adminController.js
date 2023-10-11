const User = require('../models/userModels');
const dotenv = require("dotenv")

const adminUser = async (req, res) => {
  const { username, password, } = req.body;
  const {ADMIN_USER, ADMIN_PASS} = process.env;

  try {
  if (username ===ADMIN_USER && password === ADMIN_PASS) {
    return res.status(200).json({ message: 'Welcome to the admin page' });
  }else{
    return res.status(400).json({message:"Validation Failed"})
  }
} catch(err) {
  return res.send(err)
}};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};
module.exports = { adminUser, getAllUsers };