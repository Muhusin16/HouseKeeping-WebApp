const express = require("express");
const connectDb = require("./config/dbConnection")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const cors = require("cors");
require("dotenv").config();
const app = express();
exports.app = app;

app.use(cors({origin:true}));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.post("/api/register", require("./controllers/userController"))


connectDb();
const PORT = process.env.PORT || 8080;

app.listen(PORT, () =>{
    console.log(`Server running on PORT ${PORT}`)
});