const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  title: String,
  image: {
    data: Buffer, 
    contentType:{ 
      type: String,
      required: true
    }
  },
  description: String,
  tasks: [
    {
      title: String,
      description: String,
     
      how: {
        type: Boolean,
        default: false,
      },
      show1: {
        type: Boolean,
        default: false,
      },
      success1: {
        type: Boolean,
        default: false,
      },
      psuccess: {
        type: Boolean,
        default: false,
      },
      pause: {
        type: Boolean,
        default: false,
      },
      timer1: {
        type: Number,
        default: 1,
      },
      ptime1: {
        type: Number,
        default: 1,
      },
      pshow: {
        type: Boolean,
        default: false,
      },
      date: {
        type: Date,
        default: new Date(),
      },
    },
  ],
  
});

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;