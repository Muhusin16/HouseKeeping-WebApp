const mongoose = require("mongoose");

const adminSchema = mongoose.Schema({
    username:{
        type: String,
        required: [true, "Please add the user name"],
    },
    email: {
        type: String,
        required: [true, "Please add the user email address"],
        unique: [true, "Email address already taken"]
    },
    password:{
        type: String,
        required: [true, "Please add the user password"],
    },
    isAdmin: {
      type: Boolean,
      default: false, 
    }
  },
  {
    timestamps: true,
  });
  
module.exports= mongoose.model('Admin', adminSchema);