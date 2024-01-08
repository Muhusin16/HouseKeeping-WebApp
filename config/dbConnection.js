const mongoose = require("mongoose");
const winston = require("winston");
const Logger = require("../utils/logger")

require("winston-mongodb");
// const connectDb = async () =>{
//     try{
//       const connect = await mongoose.connect(process.env.CONNECTION_STRING, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//   console.log("Database Connected with:" ,connect.connection.name)
//   }catch(err){
//     console.log(err)
//   }
//   };

  async function connectDb() {
    // const DB_URL = getDBUrl();
    Logger.log(`CONNECTING TO MONGODB: ${process.env.CONNECTION_STRING}`);
    const connection = await mongoose.connect(process.env.CONNECTION_STRING, {
      minPoolSize: 10,
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    if (connection) {
      Logger.log("DB CONNECTED !");
      mongoose.set("debug", function (collectionName, methodName, ...methodArgs) {
        Logger.log(
          `MONGO LOG: Collection Name: ${collectionName} | Method Name: ${methodName}`
        );
      });
    } else {
      setTimeout(connectDb, 5000);
    }
  }

  module.exports = connectDb;