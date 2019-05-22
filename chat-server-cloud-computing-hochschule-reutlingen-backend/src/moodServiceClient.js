const request = require("request");
const Logger = require("./logger");
const Environment = require("./environment");

class MoodServiceClient {
  constructor() {
    this.logger = new Logger();
  }

  analyseMood(text) {
    return this._analyseMood(text)
      .then(response => response["body"])
      .then(body => body["mood"]);
  }

  _analyseMood(text) {
    return new Promise((resolve, reject) => {
      const requestConfiguration = {
        headers: {},
        url: "https://ecstatic-ptolemy.eu-de.mybluemix.net/tone",
        json: true,
        body: {
          texts: [text]
        }
      };

      MoodServiceClient._configureProxy(requestConfiguration);
      request.post(requestConfiguration, function(error, response, body) {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
    });
  }

  static _configureProxy(requestConfiguration) {
    if (Environment.proxy.enabled) {
      requestConfiguration.proxy = Environment.proxy.url;
    }
  }
}

module.exports = MoodServiceClient;
