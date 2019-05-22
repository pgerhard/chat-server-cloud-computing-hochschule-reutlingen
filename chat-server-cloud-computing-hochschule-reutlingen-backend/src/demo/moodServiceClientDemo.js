const MoodServiceClient = require("../moodServiceClient");

const moodServiceClient = new MoodServiceClient();

moodServiceClient.analyseMood("Hello Stefan").then(value => console.log(value));
