const express = require("express");

const {registerUser, loginUser, homepage } = require("../controllers/userController");
const {validateToken} = require("../middleware/validatetokenHandler")

const router = express.Router();

router.post("/register", registerUser );

router.post("/login", loginUser );

router.get("/home", validateToken, homepage );

module.exports = router;