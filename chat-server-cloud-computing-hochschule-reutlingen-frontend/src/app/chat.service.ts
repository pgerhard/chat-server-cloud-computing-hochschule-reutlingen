import { Observable } from "rxjs";
import { ChatMessage } from "./chat-message";
import { User } from "./user";
import { SocketioService } from "./socketio.service";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class ChatService {
  lastmsg: string;

  constructor(private socketIo: SocketioService) {}

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

        console.log(
          `Delivering message ${chatMessage.content} to all observers`
        );
        observer.next(chatMessage);
      });
    });
  }

  public registerNewUser(user: User) {
    this.socketIo.socket.emit("register_user", user);
  }
}
