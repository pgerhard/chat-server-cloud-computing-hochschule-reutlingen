import { Observable } from "rxjs";
import { ChatMessage } from "./chat-message";
import { User } from "./user";
import { SocketioService } from "./socketio.service";
import { Injectable } from "@angular/core";
import { Room } from "./room";
import { MessageType } from "./message-type";
import { UserService } from "./user.service";

@Injectable({
  providedIn: "root"
})
export class ChatService {
  lastmsg: string;

  rooms: Room[] = [];

  private privateMessageFilterRegex = new RegExp("#([a-zA-Z]+)", "gm");

  constructor(private socketIo: SocketioService, private userService: UserService) {
    let parent = this;
    this.socketIo.socket.on("available_rooms", msg => {
      const jsonRooms = JSON.parse(msg);
      this.rooms = [];
      jsonRooms.forEach(function(jsonRoom) {
        let room: Room = new Room();
        room.name = jsonRoom._name;
        room.identifier = jsonRoom._identifier;
        parent.rooms.push(room);
      });
    });
  }

  public sendMessage(message: ChatMessage) {
    if (this.privateMessageFilterRegex.test(message.content)) {
      console.log(`Message contains an '#'. Treating as private message`);
      message.type = MessageType.PRIVATE;
      message.sender = this.userService.findUserByName(this.userService.loggedInUser.name);
      message.recipients.push(message.sender);

      let recipient;
      this.privateMessageFilterRegex.exec("");
      while ((recipient = this.privateMessageFilterRegex.exec(message.content)) !== null) {
        if (recipient[1] === this.userService.loggedInUser.name) {
          console.log(`Sender as recipient. Skipping`);
        } else {
          message.recipients.push(this.userService.findUserByName(recipient[1]));
        }
      }
      this.socketIo.socket.emit("new_message", message);
    } else {
      this.sendBroadcastMessage(message);
    }
    this.lastmsg = message.content;
  }

  public getMessages(): Observable<ChatMessage> {
    return Observable.create(observer => {
      this.socketIo.socket.on("broadcast_message", msg => {
        const chatMessage = new ChatMessage();
        chatMessage.content = msg._content;
        chatMessage.timestamp = msg._timestamp;
        chatMessage.type = MessageType.parseMessageType(msg._type);
        chatMessage.recipients = msg._recipients;

        console.log(`Delivering message ${chatMessage.content} to all observers`);
        console.log(chatMessage);
        observer.next(chatMessage);
      });
    });
  }

  public getRooms(): Room[] {
    return this.rooms;
  }

  private sendBroadcastMessage(message: ChatMessage) {
    message.type = MessageType.NORMAL;
    message.recipients = this.userService.loggedInUsers();
    console.log(message);
    this.socketIo.socket.emit("new_message", message);
  }
}
