const request = require("request");
const LanguageTranslatorClient = require("../languageTranslatorClient");

const originalText = "Language Translator translates text from one language to another";
const targetLanguage = "de";

const translator = new LanguageTranslatorClient();
translator.autotranslateText(originalText, targetLanguage).then(translation => console.log(translation));
