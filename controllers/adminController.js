const bcrypt = require('bcrypt');
const saslprep = require('saslprep');
const Admin = require('../models/adminModel'); 

const adminUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingAdmin = await Admin.findOne();

    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin user already exists' });
    }

    const preparedPassword = saslprep(password);

    const hashedPassword = await bcrypt.hash(preparedPassword, 10);

    const newAdmin = new Admin({
      username,
      email,
      password: hashedPassword,
      isAdmin: true, 
    });

    await newAdmin.save();

    res.status(201).json({ message: 'Admin user created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};
module.exports = { adminUser, getAllUsers };