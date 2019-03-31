var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);
var port = process.env.PORT || 3000;
var fstr  = require('fstr');

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", function(socket) {
  console.log("A user has connected");
  io.emit("chat message", "A new user has connected");

  socket.on("new_message", function(msg) {
    console.log(
      `Message reads '${msg._content}', timestamp '${msg._timestamp}'`
    );
    io.emit("broadcast_message", msg);
  });

  socket.on("disconnect", function() {
    console.log("A user has disconnected");
  });
});

http.listen(process.env.PORT || 3000, function() {
  const port = process.env.PORT ? process.env.PORT : 3000;
  console.log(`listening on ${port}`);
});

var bus = require('connect-bus');
app.use(bus());
app.post('/file', function(req, res){
    //Stream
    var fileStream;
    //create message-object
    var msg={ 'path':"",'fileName':"",'fileType':"","file":"","from":"","to":"","private":""};


    req.pipe(req.bus);
    var private=false;
    //sent file
    req.bus.on('file', function (fieldname, file, filename, encoding, mimetype) {
        //create Stream
        filestream = fstr.createWriteStream(path.resolve(__dirname+"/test/"+filename));
        file.pipe(filestream);
        var buffer = [];
        file.on('data',function(data) {
            buffer[buffer.length] = data;
        }).on('end', function() {
            var buf = Buffer.concat(buffer);
            //pipe
            res.pipe(file);
            //fill the message
            msg.path=file.path;
            msg.fileName=filename;
            msg.fileType=mimetype;
            //file in base64 format
            msg.file=buf.toString('base64');

          io.sockets.emit('file', msg);
        });
        //close stream, send feedback to response
        filestream.on('close', function () {
            res.send('success!');
        });
    });
}

