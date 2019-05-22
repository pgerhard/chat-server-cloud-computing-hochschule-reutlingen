const request = require("request");
const Logger = require("./logger");
const Environment = require("./environment");

class LanguageTranslatorClient {
  constructor() {
    this.logger = new Logger();
    this.env = Environment;
  }

  autotranslateText(oText, tgtLanguage) {
    const parent = this;
    return parent
      ._identifyLanguage(oText)
      .then(response => {
        this.logger.debug(`LanguageTranslatorClient: Identify Language response ${JSON.stringify(response)}`);
        return JSON.parse(response["body"]);
      })
      .then(body => {
        this.logger.debug(`LanguageTranslatorClient: Identify Language parsed body ${JSON.stringify(body)}`);
        return body["languages"][0]["language"];
      })
      .then(language => {
        this.logger.debug(`LanguageTranslatorClient: Extracted detected language ${language}`);
        return parent._translateText(oText, language, tgtLanguage);
      })
      .then(response => {
        // console.log(response);
        this.logger.debug(`LanguageTranslatorClient: Translate text response ${JSON.stringify(response)}`);
        return response["body"]["translations"][0]["translation"];
      });
  }

  _identifyLanguage(text, callback) {
    return new Promise((resolve, reject) => {
      request.post(
        {
          headers: {
            Authorization: this.env.languageTranslator.authorization,
            "Content-Type": "text/plain"
          },
          proxy: "http://192.168.52.252:8080",
          url: this.env.languageTranslator.endpoints.identify,
          qs: { version: this.env.languageTranslator.version },
          body: text
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

  _translateText(text, sourceLanguage, targetLanguage) {
    return new Promise((resolve, reject) => {
      request.post(
        {
          headers: {
            Authorization: this.env.languageTranslator.authorization,
            "Content-Type": "application/json"
          },
          proxy: "http://192.168.52.252:8080",
          url: this.env.languageTranslator.endpoints.translate,
          qs: { version: this.env.languageTranslator.version },
          json: true,
          body: {
            text: [text],
            model_id: `${sourceLanguage}-${targetLanguage}`
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

module.exports = LanguageTranslatorClient;
