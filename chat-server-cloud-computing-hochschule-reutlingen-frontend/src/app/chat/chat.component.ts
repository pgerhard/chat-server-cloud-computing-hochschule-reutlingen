import { Component, Input, OnInit } from "@angular/core";
import { ChatMessage } from "../chat-message";
import { ChatService } from "../chat.service";

@Component({
  selector: "app-chat",
  templateUrl: "./chat.component.html",
  styleUrls: ["./chat.component.scss"]
})
export class ChatComponent implements OnInit {
  messages: ChatMessage[] = [];

  @Input()
  message: string;

  constructor(private chatService: ChatService) {}

  ngOnInit() {
    this.chatService.getMessages().subscribe((message: ChatMessage) => {
      console.log(`Received new message ${message["_content"]}`);
      this.messages.push(message);
    });
  }

  sendMessage() {
    const chatMessage = new ChatMessage();
    chatMessage.content = this.message;
    chatMessage.timestamp = new Date();

    console.log(
      `Sending message '${chatMessage.content}' at ${chatMessage.timestamp}`
    );
    this.chatService.sendMessage(chatMessage);
  }
}
