const express =require("express");

const { registerUser, loginUser, homepage, forgetPassword, resetPassword, resendOTP, createUser, signUp, login, } = require("../controllers/userController");

const {validateToken} = require("../middleware/validatetokenHandler");

const router = express.Router();

router.post("/create", createUser)

router.post("/signUp", signUp)

router.post("/login", login)

router.post("/register", registerUser);

router.post("/login", loginUser);

router.post("/forgot-password", forgetPassword);

router.post("/reset-password", resetPassword);

router.post("/resend-otp", resendOTP);

router.get("/home",validateToken, homepage);

module.exports = router;