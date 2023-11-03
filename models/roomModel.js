const mongoose = require("mongoose");

const roomDataSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  titleImage: {
    data: Buffer, 
    contentType:{ 
      type: String,
      required: true}
  },
  problem: String
});

const hallSchema = new mongoose.Schema({
  roomType: {
    type: String,
    enum: ["hall"],
    required: true,
  },
  roomData: [roomDataSchema] 
});

const kitchenSchema = new mongoose.Schema({
  roomType: {
    type: String,
    enum: ["kitchen"],
    required: true,
  },
  roomData: [roomDataSchema]
});

const receptionSchema = new mongoose.Schema({
  roomType: {
    type: String,
    enum: ["reception"],
    required: true,
  },
  roomData: [roomDataSchema] 
});

const conferenceSchema = new mongoose.Schema({
  roomType: {
    type: String,
    enum: ["conference"],
    required: true,
  },
  roomData: [roomDataSchema] 
});

const washroomSchema = new mongoose.Schema({
  roomType: {
    type: String,
    enum: ["washroom"],
    required: true,
  },
  roomData: [roomDataSchema] 
});

const HallTask = mongoose.model("HallTask", hallSchema);
const KitchenTask = mongoose.model("KitchenTask", kitchenSchema);
const ReceptionTask = mongoose.model("ReceptionTask", receptionSchema);
const ConferenceTask = mongoose.model("ConfernceTask", conferenceSchema);
const WashroomTask = mongoose.model("WashroomTask", washroomSchema);

module.exports = {
  HallTask,
  KitchenTask,
  ReceptionTask,
  ConferenceTask,
  WashroomTask
};