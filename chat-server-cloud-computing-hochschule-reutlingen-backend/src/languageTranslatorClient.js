const request = require("request");
const Logger = require("./logger");
const Environment = require("./environment");

class LanguageTranslatorClient {
  constructor() {
    this.logger = new Logger();
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
      const requestConfiguration = {
        headers: {
          Authorization: Environment.languageTranslator.authorization,
          "Content-Type": "text/plain"
        },
        url: Environment.languageTranslator.endpoints.identify,
        qs: { version: Environment.languageTranslator.version },
        body: text
      };

      LanguageTranslatorClient._configureProxy(requestConfiguration);
      request.post(requestConfiguration, function(error, response, body) {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
    });
  }

  _translateText(text, sourceLanguage, targetLanguage) {
    return new Promise((resolve, reject) => {
      const requestConfiguration = {
        headers: {
          Authorization: Environment.languageTranslator.authorization,
          "Content-Type": "application/json"
        },
        url: Environment.languageTranslator.endpoints.translate,
        qs: { version: Environment.languageTranslator.version },
        json: true,
        body: {
          text: [text],
          model_id: `${sourceLanguage}-${targetLanguage}`
        }
      };

      LanguageTranslatorClient._configureProxy(requestConfiguration);
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

module.exports = LanguageTranslatorClient;
