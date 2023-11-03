const jwt = require('jsonwebtoken');
const User = require("../models/userModels");
const bcrypt = require("bcrypt")
//const twilio = require('twilio');


const nodemailer = require("nodemailer");
const crypto = require("crypto");

const registerUser = async (req, res) => {
  const { username, email, password, phone, resendOTP } = req.body;

  if (resendOTP) {
      // User requested to resend OTP
      const existingUser = await User.findOne({ email });

      if (!existingUser) {
          return res.status(404).json({ message: 'User not found' });
      }

      // Generate a new OTP
      const otp = generateOTP();

      // Update the user's OTP with the new one
      existingUser.otp = otp;
      await existingUser.save();

      // Send the new OTP to the user's email
      const otpSent = sendOTPEmail(email, otp);

      if (!otpSent) {
          return res.status(500).json({ message: 'Failed to send OTP' });
      }

      return res.status(200).json({ message: 'New OTP sent' });
  } else {
      // User is registering for the first time
      // Generate a random 6-digit OTP
      const otp = generateOTP();

      // Send the OTP to the user's email
      const otpSent = sendOTPEmail(email, otp);

      if (!otpSent) {
          return res.status(500).json({ message: 'Failed to send OTP' });
      }

      const existingUser = await User.findOne({ email });

      if (existingUser) {
          return res.status(400).json({ message: 'User already exists' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await User.create({
          username,
          email,
          phone,
          password: hashedPassword,
          otp,
      });

      if (newUser) {
          res.status(201).json({ id: newUser.id, email: newUser.email });
      } else {
          res.status(400).json({ message: 'User data is not valid' });
      }
  }
};



const generateOTP = () => {
  return crypto.randomBytes(3).toString('hex'); 
};

const sendOTPEmail = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.USER,
      pass: process.env.PASSWORD, 
    },
  });

  const mailOptions = {
    from: 'muhusin@zool.in',
    to: email,
    subject: 'Your OTP for Registration',
    text: `Your OTP for registration is: ${otp}`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent: ${info.response}`);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).json({ message: 'Authentication failed' });
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return res.status(401).json({ message: 'Authentication failed' });
  }

  const token = jwt.sign(
  { userId: user._id, email: user.email },
  process.env.SECRET_ACCESS_KEY,
  { expiresIn: '7d' }
  );
  res.status(200).json({ token });
};

const sendResetPasswordEmail = async (email, resetPasswordToken) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail', 
    auth: {
      user: process.env.USER,
      pass: process.env.PASSWORD, 
    },
  });

  const mailOptions = {
    from: 'muhusin@zool.in',
    to: email,
    subject: 'Reset Password Request',
    text: `To reset your password, click the following link: ${resetPasswordToken}`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent: ${info.response}`);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const forgetPassword = async (req, res) => {
  const { email } = req.body;

  const generateResetPasswordToken = () => {
    return crypto.randomBytes(3).toString('hex'); 
  };

  const resetPasswordToken = generateResetPasswordToken();
  const resetPasswordTokenExpiration = new Date(Date.now() + 3600000); // 1 hour

  try {
      const user = await User.findOne({ email });

      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }
  
      user.resetPasswordToken = resetPasswordToken;
      user.resetPasswordTokenExpiration = resetPasswordTokenExpiration;

      await user.save();

      sendResetPasswordEmail(email, resetPasswordToken);

      res.status(200).json({ message: 'Reset password email sent' });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
  }
};

const resetPassword = async (req, res) => {
  const { email, resetPasswordToken, newPassword } = req.body;

  try {
      const user = await User.findOne({
          email,
          resetPasswordToken,
          resetPasswordTokenExpiration: { $gt: Date.now() },
      });

      if (!user) {
          return res.status(400).json({ message: 'Invalid or expired reset password token' });
      }

      // Update the user's password with the new one
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;

      // Clear the reset password token and expiration
      user.resetPasswordToken = undefined;
      user.resetPasswordTokenExpiration = undefined;

      await user.save();

      res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
  }
};

const homepage = async (req, res) => {
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
};

module.exports = { registerUser, loginUser, homepage, forgetPassword, resetPassword };
