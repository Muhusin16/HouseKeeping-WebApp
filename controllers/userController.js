const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saslprep = require("saslprep");
const User = require("../models/userModels");


const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

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
    
  });

  console.log(`User created ${newUser}`);

  await newUser.save();

  res.status(201).json({ id: newUser.id, email: newUser.email });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).json({ message: 'Authentication failed' });
  }

  const passwordMatch = await bcrypt.compare(saslprep(password), user.password);

  if (!passwordMatch) {
    return res.status(401).json({ message: 'Authentication failed' });
  }

  const token = jwt.sign(
     { userId: user._id, email: user.email }
  ,
  process.env.SECRET_ACCESS_KEY,
  { expiresIn: '7d' }
  );

  res.status(200).json({ token });
};

const homepage = async (req, res) => {
  try {
  
    const user = req.user;

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    res.status(200).json({
      message: `Authentication Successful, Welcome to the task page ${user.username}`,
      
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { registerUser, loginUser, homepage };


