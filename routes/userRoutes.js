const express =require("express");

const { registerUser, loginUser, homepage, forgetPassword, resetPassword } = require("../controllers/userController");

const {validateToken} = require("../middleware/validatetokenHandler");

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.post("/forgot-password", forgetPassword)

router.post("/reset-password", resetPassword)

router.get("/home",validateToken, homepage);

module.exports = router;