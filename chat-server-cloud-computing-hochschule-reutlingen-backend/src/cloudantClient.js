const Logger = require("./logger");
const Environment = require("./environment");
const Cloudant = require("@cloudant/cloudant");

class CloudantClient {
  constructor() {
    this.logger = new Logger();

    const config = {
      url: Environment.cloudant.endpoint,
      plugins: {
        iamauth: {
          iamApiKey: Environment.cloudant.apiKey
        }
      }
    };

    CloudantClient._configureProxy(config);
    this.cloudant = new Cloudant(config, (err, cloudant, pong) => {
      if (err) {
        this.logger.error(`CloudantClient: Initialization error ${JSON.stringify(err)}`);
      } else {
        this.logger.info(`CloudantClient: Successfully initialized connection with server. Details:\n ${JSON.stringify(pong)}`);
        cloudant.db.list().then(databases => {
          if (databases.length == 0) {
            this.logger.debug(`CloudantClient: Server has not defined databases`);
          } else {
            this.logger.debug(`CloudantClient: Available databases ${JSON.stringify(databases)}`);
          }
        });
      }
    });
  }

  initDatabase(dbName) {
    return this._checkIfDbExists(dbName).then(dbExists => {
      if (!dbExists) {
        this.logger.debug(`CloudantClient: No database with name ${dbName} found. Creating database`);
        return this._createDatabase(dbName);
      } else {
        this.logger.debug(`CloudantClient: Database with name ${dbName} already exists`);
        return;
      }
    });
  }

  _checkIfDbExists(dbName) {
    return this.cloudant.db.list().then(body => {
      return body.includes(dbName);
    });
  }

  _createDatabase(dbName) {
    return this.cloudant.db
      .create(dbName)
      .then(response => {
        this.logger.debug(`CloudantClient: Successfully created database named ${dbName}. Server response:\n ${JSON.stringify(response)}`);
        return true;
      })
      .catch(err => {
        console.log(err);
        this.logger.error(`CloudantClient: Failed to create database named ${dbName}. Server response:\n ${JSON.stringify(err)}`);
        return false;
      });
  }

  static _configureProxy(requestConfiguration) {
    if (Environment.proxy.enabled) {
      requestConfiguration.requestDefaults = {
        proxy: Environment.proxy.url
      };
    }
  }
}

module.exports = CloudantClient;
