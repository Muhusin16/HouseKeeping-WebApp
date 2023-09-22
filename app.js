const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saslprep = require("saslprep");
const errorHandler = require('./middleware/errorHandler');
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8080 ;

app.use(bodyParser.json());
app.use(errorHandler)

const connecDb = async () =>{
  try{
    const connect = await mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
console.log("Database Connected :" ,connect.connection.name)
}catch(err){
  console.log(err)
}
};

const userSchema = mongoose.Schema({
  username:{
      type: String,
      required: [true, "Please add the user name"],
  },
  email: {
      type: String,
      required: [true, "Please add the user email address"],
      unique: [true, "Email address already taken"]
  },
  password:{
      type: String,
      required: [true, "Please add the user password"],
  },
},
{
  timestamps: true,
});

const User = mongoose.model('User', userSchema);


app.post("/register", async (req, res) => {
  
  const { username, email, password } = req.body;
  //finding if user exists
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }
  // Prepare the password using SASLPrep
  const preparedPassword = saslprep(password);

  //hasing the pasword
  const hashedPassword = await bcrypt.hash(preparedPassword, 10);

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });
  console.log(`User created ${newUser}`)
  await newUser.save();
  
  res.status(201).json({ message: 'User registered successfully' });
  
}
)

app.post("/login", async (req, res) => {
try {
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
    { expiresIn: '1h' }
  );

  res.status(200).json({ message: 'Authentication successful', token });
} catch (error) {
  console.error('Error authenticating user:', error);
  res.status(500).json({ message: 'Internal Server Error' });
}
});
connecDb();

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


