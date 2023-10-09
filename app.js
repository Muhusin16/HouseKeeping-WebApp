
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
app.use(express.json())

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
  
  res.status(201).json({ message: 'User registered successfully' ,id: User.id, email: User.email});
  
}
)
//login User
app.post("/login", async (req, res) => {

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
  const accesstoken = jwt.sign(
    { userId: user._id, email: user.email },
    process.env.SECRET_ACCESS_KEY,
    { expiresIn: '10m' }
  );
  res.status(200).json({accesstoken});
  
  function authenticateToken(req, res, next) {
    // Get the token from the request header
    const token = req.header('Authorization');
  
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  
    // Verify the token
    jwt.verify(token, process.env.SECRET_ACCESS_KEY, (err, user) => {
      if (err) {
        return res.status(403).json({ message: 'Forbidden' });
      }
      req.user = user; // Attach user data to the request object
      next();
    });
  }
    app.get('/home', authenticateToken, (req, res) => {
      // Access the user information from req.user
      const user = req.user;
      res.json({ message: 'Welcome to the home page', user });
    })
  });

connecDb();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});











const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const connectDb = require("./config/dbConnection");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('public'));

const PORT = process.env.PORT || 8080;


// Register route
app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  if(!username || !email || !password) {
    res.status(400);
    throw new Error("All Fields Are Mandatory");
}
const userAvailable = await User.findOne({email});
if (userAvailable) {
    res.status(400);
    throw new Error("Usere already registered!");
}else
  console.log(`User Registered - Username: ${username}, Email: ${email}, Password: ${password}`);
  res.send('Registration Successful');
});
connectDb();
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
