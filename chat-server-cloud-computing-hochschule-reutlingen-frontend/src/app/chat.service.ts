import { Observable } from "rxjs";
import { ChatMessage } from "./chat-message";
import { User } from "./user";
import { SocketioService } from "./socketio.service";
import { Injectable } from "@angular/core";
import { Room } from "./room";

@Injectable({
  providedIn: "root"
})
export class ChatService {
  lastmsg: string;

  rooms: Room[] = [];

  constructor(private socketIo: SocketioService) {
    let parent = this;
    this.socketIo.socket.on("available_rooms", msg => {
      const jsonRooms = JSON.parse(msg);
      this.rooms = [];
      jsonRooms.forEach(function(jsonRoom) {
        let room: Room = new Room();
        room.name = jsonRoom._name;
        parent.rooms.push(room);
      });
    });
  }

  public sendMessage(message: ChatMessage) {
    this.socketIo.socket.emit("new_message", message);
    this.lastmsg = message.content;
  }

  public getMessages(): Observable<ChatMessage> {
    return Observable.create(observer => {
      this.socketIo.socket.on("broadcast_message", msg => {
        const chatMessage = new ChatMessage();
        chatMessage.content = msg._content;
        chatMessage.timestamp = msg._timestamp;
        chatMessage.type = msg._type;
        chatMessage.recipients = msg._recipients;

        console.log(`Delivering message ${chatMessage.content} to all observers`);
        observer.next(chatMessage);
      });
    });
  }

  public registerNewUser(user: User) {
    this.socketIo.socket.emit("register_user", user);
  }

  public getRooms(): Room[] {
    return this.rooms;
  }
}
