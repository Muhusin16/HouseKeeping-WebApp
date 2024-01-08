const winston = require("winston")

const consoleLogger = winston.createLogger({
    level: "info",
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json()
    ),
    transports: [new winston.transports.Console()],
  });
  
  const log = (message) => {
    consoleLogger.log("info", message);
  };
  
  const error = (message) => {
    consoleLogger.error("error", message);
  };
  
  module.exports = { log, error };