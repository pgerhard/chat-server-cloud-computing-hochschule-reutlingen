const User = require("./user");
const Room = require("./room");

var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);

var port = process.env.PORT || 3000;

const privateMessageFilterRegex = new RegExp("#([a-zA-Z]+)", "gm");
const generalRoomName = "General";
const users = new Map();
const rooms = new Map();

io.on("connection", function(socket) {
  console.log(`New Socket opened ${socket.id}`);
  socket.emit("connection_created");

  socket.on("register_user", function(jsonUser) {
    const user = userFromJson(jsonUser);

    if (users.get(user.name)) {
      console.log(`User ${user.name} already registered, new socket id ${socket.id}`);
      users.get(user.name).socketId = socket.id;
    } else {
      console.log(`Registering new user ${user.name}, socket id ${socket.id}`);
      users.set(user.name, new User(user.name, socket.id));
    }

    let general = rooms.get(generalRoomName);
    if (!general) {
      general = new Room(generalRoomName, new Array());
      rooms.set(generalRoomName, general);
    }
    general.participants.push(users.get(user._name));
    socket.join(generalRoomName);

    io.emit("available_rooms", JSON.stringify([...rooms.values()]));
    io.emit("registered_users", JSON.stringify([...users.values()]));
  });

  socket.on("logout_user", function(jsonUser) {
    const user = userFromJson(jsonUser);
    if (users.get(user.name)) {
      console.log(`Logging out ${user.name}`);
      users.delete(user.name);

      rooms.forEach((room, roomName) => {
        for (var i = 0; i < room.participants.length; i++) {
          if (room.participants[i].name === user.name) {
            console.log(`Removing ${user.name} from room ${room.name}`);
            room.participants.splice(i, 1);
          }
        }
      });

      io.emit("available_rooms", JSON.stringify([...rooms.values()]));
      io.emit("registered_users", JSON.stringify([...users.values()]));
    }
  });

  socket.on("new_message", function(msg) {
    console.log(`Message reads '${msg._content}', timestamp '${msg._timestamp}'`);
    if (privateMessageFilterRegex.test(msg._content)) {
      console.log(`Message contains an '#'. Treating as private message`);
      msg._type = "PRIVATE";
      privateMessageFilterRegex.exec("");
      while ((recipient = privateMessageFilterRegex.exec(msg._content)) !== null) {
        const recipientUsername = recipient[1];
        if (users.get(recipientUsername)) {
          console.log(`Recipient of private message ${recipientUsername}`);
          io.to(`${users.get(recipientUsername).socketId}`).emit("broadcast_message", msg);
        } else {
          console.log(`Unknown recipient ${recipientUsername}`);
        }
      }
      io.to(`${socket.id}`).emit("broadcast_message", msg);
    } else {
      msg._type = "NORMAL";
      io.to(`${generalRoomName}`).emit("broadcast_message", msg);
    }
  });

  socket.on("disconnect", () => handleDisconnect(socket));
});

http.listen(process.env.PORT || 3000, function() {
  const port = process.env.PORT ? process.env.PORT : 3000;
  console.log(`listening on ${port}`);
});

/**
 * Handle the disconnect event emitted by Socket.IO
 * @param socket the socket that has disconnected
 */
function handleDisconnect(socket) {
  users.forEach(function(user, username) {
    if (user.socketId === socket.id) {
      console.log(`${user.name} has disconnected`);
      users.delete(user.name);
    }
  });
  io.emit("registered_users", JSON.stringify([...users.values()]));
}

function userFromJson(jsonUser) {
  let user = Object.create(User.prototype);
  return Object.assign(user, jsonUser);
}
