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
