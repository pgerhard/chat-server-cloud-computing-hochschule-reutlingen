const IbmCloudObjectStorageClient = require("../ibmCloudObjectStorageClient");
const Encoder = require("../encoder");

let environment = require("../environment");
let fs = require("fs");

const file = fs.readFileSync("uploads/screenshot.png");

let ibmCosClient = new IbmCloudObjectStorageClient();

// ibmCosClient.createObject(environment.ibmCos.buckets.profilePictures, "test-profile-picture", file).then(value => console.log(value));
// ibmCosClient.createObject(environment.ibmCos.buckets.uploads, "test-upload", file);

// ibmCosClient.loadObject(environment.ibmCos.buckets.profilePictures, "test-profile-picture");
// ibmCosClient.loadObject(environment.ibmCos.buckets.uploads, "test-upload");

// Promise.all([
//   ibmCosClient.loadObject(environment.ibmCos.buckets.profilePictures, "test-profile-picture"),
//   ibmCosClient.loadObject(environment.ibmCos.buckets.uploads, "test-upload")
// ]);

// Promise.all([
//   ibmCosClient.deleteObject(environment.ibmCos.buckets.profilePictures, "test-profile-picture"),
//   ibmCosClient.deleteObject(environment.ibmCos.buckets.uploads, "test-upload")
// ]);

// let encoder = new Encoder();
// Promise.all([
//   encoder.bcryptHash("Password to BCrypt hash").then(value => console.log(`BCrypt: ${value}`)),
//   encoder.md5Hash("Password to MD5 hash").then(value => console.log(`MD5: ${value}`))
// ]);
