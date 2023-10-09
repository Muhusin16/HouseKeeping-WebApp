const mongoose = require("mongoose");
const connecDb = async () =>{
    try{
      const connect = await mongoose.connect(process.env.CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  console.log("Database Connected :" ,connect.connection.name)
  }catch(err){
    console.log(err)
  }
  };

  module.exports = connecDb;