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

    sendWelcomeMessage(general, user);

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
            sendGoodbyeMessage(room, user);
          }
        }
      });

      io.emit("available_rooms", JSON.stringify([...rooms.values()]));
      io.emit("registered_users", JSON.stringify([...users.values()]));
    }
  });

  socket.on("new_message", function(msg) {
    console.log(`Message reads '${msg._content}', timestamp '${msg._timestamp}'`);
    if (msg._type === "PRIVATE") {
      console.log(`Message type private`);

      recipients.forEach(function(recipient) {
        if (users.get(recipient)) {
          console.log(`Recipient of private message ${recipient}`);
          let socketId = users.get(recipient).socketId;
          if (socketId === socket.id) {
            console.log(`Recipient is sender. Skipping`);
          } else {
            io.to(`${socketId}`).emit("broadcast_message", msg);
          }
        } else {
          console.log(`Unknown recipient ${recipient}`);
        }
      });

      io.to(`${socket.id}`).emit("broadcast_message", msg);
    } else {
      console.log(`Message type private`);
      sendMessageToRoom(rooms.get(generalRoomName), msg);
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
async function handleDisconnect(socket) {
  users.forEach(function(user, username) {
    if (user.socketId === socket.id) {
      console.log(`${user.name} has disconnected`);
      users.delete(user.name);
    }
  });
  io.emit("registered_users", JSON.stringify([...users.values()]));
}

/**
 * Send the welcome message to the specified room.
 * @param room to send welcome message to
 * @param user that has joined the room
 */
function sendWelcomeMessage(room, user) {
  let msg = {
    _sender: user,
    _content: `${user.name} has joined the room ${room.name}`,
    _type: "WELCOME",
    _timestamp: new Date()
  };
  sendMessageToRoom(room, msg);
}

/**
 * Send the goodbye message to the specified room
 * @param room to send the goodybe message to
 * @param user that has left the room
 */
function sendGoodbyeMessage(room, user) {
  let msg = {
    _sender: user,
    _content: `${user.name} has left the room ${room.name}`,
    _type: "WELCOME",
    _timestamp: new Date()
  };
  sendMessageToRoom(room, msg);
}

/**
 * Send a given message to a room
 * @param room to send the message to
 * @param msg to send
 */
function sendMessageToRoom(room, msg) {
  room.addMessage(msg);
  io.to(`${room.name}`).emit("broadcast_message", msg);
}

/**
 * Assign the properties of an object to a instance of the class user
 * @param jsonUser from which to assign properties
 * @returns an object of class user
 */
function userFromJson(jsonUser) {
  let user = Object.create(User.prototype);
  return Object.assign(user, jsonUser);
}
