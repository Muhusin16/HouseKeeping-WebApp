const mongoose = require("mongoose");

const hallSchema = new mongoose.Schema({
    roomType: {
        type: String,
        enum: ["hall"],
        required: true,
      },
  roomData:[],
});

const kitchenSchema = new mongoose.Schema({
    roomType: {
        type: String,
        enum: ["kitchen"],
        required: true,
      },
  roomData: [
    
  ],
});

const receptionSchema = new mongoose.Schema({
    roomType: {
        type: String,
        enum: ["reception"],
        required: true,
      },
  roomData: [
   
  ],
});

const conferenceSchema = new mongoose.Schema({
    roomType: {
        type: String,
        enum: ["conference"],
        required: true,
      },
  roomData: [
   
  ],
});

const washroomSchema = new mongoose.Schema({
    roomType: {
        type: String,
        enum: ["washroom"],
        required: true,
      },
  roomData: [
   
  ],
});


const HallTask = mongoose.model("HallTask", hallSchema);
const KitchenTask = mongoose.model("KitchenTask", kitchenSchema);
const ReceptionTask = mongoose.model("ReceptionTask", receptionSchema);
const ConfernceTask = mongoose.model("ConfernceTask", conferenceSchema);
const WashroomTask = mongoose.model("WashroomTask", washroomSchema);

module.exports = {
  HallTask,
  KitchenTask,
  ReceptionTask,
  ConfernceTask,
  WashroomTask

};
