const mongoose = require("mongoose");
// Schema for the "hall" room
const hallSchema = new mongoose.Schema({
  hallData: {
    type : String,
  }
 
}, {
  timestamps: true,
});
// Schema for the "kitchen" room
const kitchenSchema = new mongoose.Schema({
  kitchenData: {
    type : String,
  },
 
  problemSection: String,
}, {
  timestamps: true,
});

// Schema for the "reception" room
const receptionSchema = new mongoose.Schema({
  receptionData: {
    type : String,
  },

  problemSection: String,
}, {
  timestamps: true,
});

// Schema for the "conference" room
const conferenceSchema = new mongoose.Schema({
 conferenceData: {
    type : String,
  },

  problemSection: String,
}, {
  timestamps: true,
});

// Schema for the "washroom" room
const washroomSchema = new mongoose.Schema({
 washroomData: {
    type : String,
  },

  problemSection: String,
}, {
  timestamps: true,
});

const Hall = mongoose.model("Hall", hallSchema);
const Kitchen = mongoose.model("Kitchen", kitchenSchema);
const Reception = mongoose.model("Reception", receptionSchema);
const Conference = mongoose.model("Conference", conferenceSchema);
const Washroom = mongoose.model("Washroom", washroomSchema);

module.exports = {
  Hall,
  Kitchen,
  Reception,
  Conference,
  Washroom,
};