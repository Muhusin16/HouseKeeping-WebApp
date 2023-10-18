const mongoose = require("mongoose");
// Schema for the "hall" room
const hallSchema = new mongoose.Schema({
  user_id : {
    type: mongoose.Schema.Types.ObjectId,
    required: true, 
    ref: "User",
    unique: true
},
  hallData: {
    type : [],
  },
  problemSection:{ 
    type:String,
  } 
}, {
  timestamps: true,
});
// Schema for the "kitchen" room
const kitchenSchema = new mongoose.Schema({
  user_id : {
    type: mongoose.Schema.Types.ObjectId,
    required: true, 
    ref: "User",
},
  kitchenData: {
    type : [],
  },
  problemSection:{ 
    type:String,
  } 
}, {
  timestamps: true,
});

// Schema for the "reception" room
const receptionSchema = new mongoose.Schema({
  user_id : {
    type: mongoose.Schema.Types.ObjectId,
    required: true, 
    ref: "User",
   
},
  receptionData: {
    type : [],
  },
  problemSection:{ 
    type:String,
  } 
}, {
  timestamps: true,
});

// Schema for the "conference" room
const conferenceSchema = new mongoose.Schema({
  user_id : {
    type: mongoose.Schema.Types.ObjectId,
    required: true, 
    ref: "User",
},
 conferenceData: {
    type : [],
  },
  problemSection:{ 
    type:String,
  } 
}, {
  timestamps: true,
});

// Schema for the "washroom" room
const washroomSchema = new mongoose.Schema({
  user_id : {
    type: mongoose.Schema.Types.ObjectId,
    required: true, 
    ref: "User",
},
 washroomData: {
    type : [],
  },
  problemSection:{ 
    type:String,
  } 
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