const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saslprep = require("saslprep");
const User = require("../models/userModels");

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  // Check if the user already exists
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  // Prepare the password using SASLPrep
  const preparedPassword = saslprep(password);

  // Hash the password
  const hashedPassword = await bcrypt.hash(preparedPassword, 10);

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  console.log(`User created ${newUser}`);

  await newUser.save();

  res.status(201).json({ message: 'User registered successfully', id: newUser.id, email: newUser.email });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Find the user by email
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).json({ message: 'Authentication failed' });
  }

  // Compare the hashed password
  const passwordMatch = await bcrypt.compare(saslprep(password), user.password);

  if (!passwordMatch) {
    return res.status(401).json({ message: 'Authentication failed' });
  }

  // Generate a JWT token
  const token = jwt.sign(
    { userId: user._id, email: user.email },
    process.env.SECRET_ACCESS_KEY,
    { expiresIn: '10m' }
  );
  
  res.status(200).json({ token });

};

const homepage = async (req, res) => {

  const currentUser = req.user;

  try {
  
    const user = await User.findById(currentUser);
    
    res.status(200).json({ message: 'Welcome to the home page', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { registerUser, loginUser, homepage };




  