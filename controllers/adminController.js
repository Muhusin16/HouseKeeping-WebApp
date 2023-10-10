const User = require('../models/userModels');
const bcrypt = require('bcrypt');
const saslprep = require('saslprep');

const adminUser = async (req, res) => {
  const { username, email, password, isAdmin } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const preparedPassword = saslprep(password);

  const hashedPassword = await bcrypt.hash(preparedPassword, 10);

  const newUser = await User.create({
    username,
    email,
    password: hashedPassword,
    isAdmin,
  });

  console.log(`Admin user created ${newUser}`);

  await newUser.save();

  res.status(201).json({ id: newUser.id, email: newUser.email });
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