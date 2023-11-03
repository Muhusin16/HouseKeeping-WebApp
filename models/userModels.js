const mongoose = require("mongoose");
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
    phone: {
        type: Number,
        required: [true, "Please enter your mobile number"],
        unique: [true, "Phone number already exist"]
    },
    password:{
        type: String,
        required: [true, "Please add the user password"],
    },
    otp: String,
    resetPasswordToken: String,
    resetPasswordTokenExpiration: Date,
    
},
{
    timestamps: true,
});
module.exports = mongoose.model("user", userSchema);