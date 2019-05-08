let environment = require("./environment");

class Logger {
  info(msg) {
    if (environment.logLevel === "INFO" || environment.logLevel === "DEBUG") {
      console.log(`INFO: ${msg}`);
    }
  }

  debug(msg) {
    if (environment.logLevel === "DEBUG") {
      console.log(`DEBUG: ${msg}`);
    }
  }
}

module.exports = Logger;
