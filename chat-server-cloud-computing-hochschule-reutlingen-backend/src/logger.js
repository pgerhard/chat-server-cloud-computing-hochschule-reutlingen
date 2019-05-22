let environment = require("./environment");

class Logger {
  error(msg) {
    console.error(`ERROR: ${msg}`);
  }

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
