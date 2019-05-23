const CloudantClient = require("../cloudantClient");

const cloudantClient = new CloudantClient();
const dbName = "demo-3";
cloudantClient.initDatabase(dbName).then(() => console.log("DB initialized"));

const userDb = "users";

cloudantClient.initDatabase(userDb);
