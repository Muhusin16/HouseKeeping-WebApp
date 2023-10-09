const mongoose = require("mongoose");

const problemSection = mongoose.Schema({
    userproblem :{ type :String ,
     required:true
    }
});

module.exports = mongoose.model("Userproblem", problemSection)