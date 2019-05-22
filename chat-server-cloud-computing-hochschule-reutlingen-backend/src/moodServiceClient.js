const request = require("request");
const Logger = require("./logger");
const Environment = require("./environment");

class MoodServiceClient {
  constructor() {
    this.logger = new Logger();
    this.env = Environment;
  }

  analyseMood(text) {
    return this._analyseMood(text)
      .then(response => response["body"])
      .then(body => body["mood"]);
  }

  _analyseMood(text) {
    return new Promise((resolve, reject) => {
      request.post(
        {
          headers: {},
          proxy: "http://192.168.52.252:8080",
          url: "https://ecstatic-ptolemy.eu-de.mybluemix.net/tone",
          json: true,
          body: {
            texts: [text]
          }
        },
        function(error, response, body) {
          if (error) {
            reject(error);
          } else {
            resolve(response);
          }
        }
      );
    });
  }
}

module.exports = MoodServiceClient;
