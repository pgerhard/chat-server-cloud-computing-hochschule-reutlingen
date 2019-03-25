import * as io from "socket.io-client";
import { Observable } from "rxjs";
import { ChatMessage } from "./chat-message";

export class ChatService {
  private url = "http://localhost:3000";

  private socket;

  constructor() {
    this.socket = io(this.url);
  }

  public sendMessage(message: ChatMessage) {
    this.socket.emit("new_message", message);
  }

  public getMessages(): Observable<ChatMessage> {
    return Observable.create(observer => {
      this.socket.on("broadcast_message", msg => {
        const chatMessage = new ChatMessage();
        chatMessage.content = msg._content;
        chatMessage.timestamp = msg._timestamp;

        console.log(
          `Delivering message ${chatMessage.content} to all observers`
        );
        observer.next(chatMessage);
      });
    });
  }
}
