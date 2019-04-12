var request = require("request");

let data = {
  texts: ["I do not like what I see", "I like very much what you have said."]
};

request.post(
  {
    headers: {},
    url: "https://ecstatic-ptolemy.eu-de.mybluemix.net/tone",
    json: true,
    body: data
  },
  function(error, response, body) {
    console.log(body);
    console.log(body.mood);
  }
);
