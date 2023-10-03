const express = require('express');
const connecDb = require("./config/dbConnection")
const bodyParser = require('body-parser');
const errorHandler = require('./middleware/errorHandler');
const axios = require("axios")
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8080 ;

app.use(bodyParser.json());
app.use(errorHandler)
app.use(express.json())

app.use("/api/user", require("./routes/userRoutes"))

connecDb();
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
