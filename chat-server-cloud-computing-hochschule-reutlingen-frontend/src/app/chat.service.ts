import { Observable } from "rxjs";
import { ChatMessage } from "./chat-message";
import { SocketioService } from "./socketio.service";
import { Injectable } from "@angular/core";
import { Room } from "./room";
import { MessageType } from "./message-type";
import { UserService } from "./user.service";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { map } from "rxjs/operators";
import { environment } from "../environments/environment";

@Injectable({
  providedIn: "root"
})
export class ChatService {
  lastmsg: string;

  rooms: Room[] = [];

  private privateMessageFilterRegex = new RegExp("#([a-zA-Z]+)", "gm");

  private backendUrl: string = environment.backendUrl;

  constructor(private socketIo: SocketioService, private userService: UserService, private httpClient: HttpClient) {
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
    message.sender = this.userService.findUserByName(this.userService.loggedInUser.name);

    if (this.privateMessageFilterRegex.test(message.content)) {
      console.log(`Message contains an '#'. Treating as private message`);
      message.type = MessageType.PRIVATE;
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
      message.type = MessageType.NORMAL;
      this.sendBroadcastMessage(message);
    }
    this.lastmsg = message.content;
  }

  public getMessages(): Observable<ChatMessage> {
    return Observable.create(observer => {
      this.socketIo.socket.on("broadcast_message", msg => {
        const chatMessage = new ChatMessage();
        chatMessage.content = msg._content;
        chatMessage.mood = msg._mood;
        chatMessage.timestamp = msg._timestamp;
        chatMessage.type = MessageType.parseMessageType(msg._type);
        chatMessage.recipients = msg._recipients;
        chatMessage.fileLocation = msg._fileLocation;
        chatMessage.fileName = msg._fileName;
        chatMessage.sender = msg._sender;

        console.log(`Delivering message ${chatMessage.content} to all observers, sender ${chatMessage.sender ? chatMessage.sender["_name"] : undefined}`);
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

  sendFile(fileToUpload: File) {
    const endpoint = `${this.backendUrl}/upload-file`;
    const formData: FormData = new FormData();
    formData.append("fileKey", fileToUpload, fileToUpload.name);
    return this.httpClient.post(endpoint, formData, { observe: "response", headers: new HttpHeaders({}), responseType: "text" }).pipe(
      map((value: HttpResponse<Object>) => {
        console.log(`ChatService: File upload response headers`);
        console.log(value.headers.keys());
        return value.headers.get("Location");
      })
    );
  }
}
