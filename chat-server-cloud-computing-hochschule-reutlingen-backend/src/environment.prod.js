module.exports = {
  force_https: true,
  logLevel: "INFO",
  ibmCos: {
    endpoint: "https://s3.eu-de.cloud-object-storage.appdomain.cloud",
    apiKey: "e9-xGehpsH27knACuPfnS7Zw4wJlT80pN_ADYTujACAF",
    ibmAuthEndpoint: "https://iam.ng.bluemix.net/oidc/token",
    serviceInstanceId: "crn:v1:bluemix:public:cloud-object-storage:global:a/03fd0005352548d3bc98c2251d97396e:33a2e05a-b1fd-4794-b319-7924a2ca7093::",
    buckets: {
      profilePictures: "chat-app-server-profile-images",
      uploads: "chat-app-server-uploads"
    }
  }
};
