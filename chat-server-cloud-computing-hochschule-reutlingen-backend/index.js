var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);
var port = process.env.PORT || 3000;

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", function(socket) {
  console.log("A user has connected");
  io.emit("chat message", "A new user has connected");

  socket.on("chat message", function(msg) {
    console.log(`Message reads '${msg}'`);
    io.emit("chat message", msg);
  });

  socket.on("disconnect", function() {
    console.log("A user has disconnected");
  });
});

http.listen(port, function() {
  console.log("listening on *:" + port);
});
