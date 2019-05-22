const CloudantClient = require("../cloudantClient");

const dbName = "demo-3";
const cloudantClient = new CloudantClient();
cloudantClient.initDatabase(dbName).then(() => console.log("DB initialized"));

const userDb = "users";

cloudantClient.initDatabase(userDb);
