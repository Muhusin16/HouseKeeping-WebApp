const jwt = require("jsonwebtoken");
const User = require("../models/userModels");

const validateToken = async (req, res, next) => {
  try {
    let token;
    let authHeader = req.headers.Authorization;

    if (authHeader && authHeader.startsWith("Bearer")) {
      token = authHeader.split(" ")[1];

      jwt.verify(token, process.env.SECRET_ACCESS_KEY, async (err, decoded) => {
        if (err) {
          return res.status(401).json({ message: 'User is not authorized' });
        }

        const user = await User.findById(decoded.userId);
        if (!user) {
          return res.status(401).json({ message: 'User not found' });
        }

        req.user = user; 
        next();
      });
    } else {
      res.status(401).json({ message: 'User is not authorized or token is missing' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { validateToken };
