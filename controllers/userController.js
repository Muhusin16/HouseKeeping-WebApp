const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const User = require("../models/userModels");
const jwt = require("jsonwebtoken");
const { Error } = require("mongoose");

const registerUser = asyncHandler(async (req, res) => {
    const {username, email, password} = req.body;
    if(!username || !email || !password) {
        res.status(400);
        throw new Error("All Fields Are Mandatory");
    }
    const userAvailable = await User.findOne({email});
    if (userAvailable) {
        res.status(400);
        throw new Error("Usere already registered!");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed Password:", hashedPassword);
    const user = await User.create({
        username,email,password:hashedPassword,
    });
    console.log(`User created ${user}`);
    
    if (user) {
        res.status(201).json({id: user.id, email: user.email});
    }
    else {
        res.status(400);
        throw new Error("User data is not Valid");
    }
});

const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body;
    if(!email || !password) {
        res.status(400);
        throw new Error("All Fields are mandatory");
    }
    const user = await User.findOne({email});
    if(user && (await bcrypt.compare(password, user.password))){
        const accessToken = jwt.sign({
            user:{
                username: user.username,
                email: user.email,
                id: user.id,
            },
        },
        process.env.SECRET_ACCESS_KEY,
        {expiresIn:"15m"}
        );
        res.status(200).json({accessToken});
    }else {
        res.status(401);
        throw new Error("email or password is not valid");
    }    
});


const CurrentUser =  asyncHandler(async (req, res) => {
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
  });

module.exports = {registerUser,loginUser,CurrentUser};
