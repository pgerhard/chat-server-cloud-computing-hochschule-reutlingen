module.exports = {
  force_https: false,
  logLevel: "DEBUG",
  cloudant: {
    endpoint:
      "https://502a1efe-39a6-4dc7-99a2-cca4198ff949-bluemix:cd19e4c382ed7e83ab0d00ff4b13d49f58a7c8fda6ef8a605b19f891e6890a51@502a1efe-39a6-4dc7-99a2-cca4198ff949-bluemix.cloudantnosqldb.appdomain.cloud",
    apiKey: "jDnhbSpu1DLhroDVC3bc0bJvML0JmprsnlcVIFRDu2iF"
  },
  ibmCos: {
    endpoint: "https://s3.eu-de.cloud-object-storage.appdomain.cloud",
    apiKey: "e9-xGehpsH27knACuPfnS7Zw4wJlT80pN_ADYTujACAF",
    ibmAuthEndpoint: "https://iam.ng.bluemix.net/oidc/token",
    serviceInstanceId: "crn:v1:bluemix:public:cloud-object-storage:global:a/03fd0005352548d3bc98c2251d97396e:33a2e05a-b1fd-4794-b319-7924a2ca7093::",
    buckets: {
      profilePictures: "chat-app-server-profile-images",
      uploads: "chat-app-server-uploads"
    }
  },
  languageTranslator: {
    endpoints: {
      identify: "https://gateway-fra.watsonplatform.net/language-translator/api/v3/identify",
      translate: "https://gateway-fra.watsonplatform.net/language-translator/api/v3/translate"
    },
    version: "2018-05-01",
    authorization: "Basic YXBpa2V5OnRDcWNqTEVkbWh2a2x4cUtrcTdEMHFZeTFVc2F4TWwweFdDMzg1ckRrQnhX"
  },
  proxy: {
    enabled: false,
    url: "http://192.168.52.252:8080"
  }
};
