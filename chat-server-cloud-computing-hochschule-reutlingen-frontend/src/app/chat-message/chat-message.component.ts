import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { ChatMessage } from "../chat-message";
import { ChatService } from "../chat.service";

@Component({
  selector: "app-chat-message",
  templateUrl: "./chat-message.component.html",
  styleUrls: ["./chat-message.component.scss"]
})
export class ChatMessageComponent implements OnInit {
  messages: ChatMessage[] = [];

  fileToUpload: File = null;

  @Input()
  message: string;

  @ViewChild("fileInput")
  fileInput: ElementRef;

  constructor(private chatService: ChatService) {}

  ngOnInit() {
    this.chatService.getMessages().subscribe((message: ChatMessage) => {
      console.log(`Received new message ${message.content}`);
      this.messages.push(message);
    });
  }

  sendMessage() {
    const chatMessage = new ChatMessage();
    chatMessage.content = this.message;
    chatMessage.timestamp = new Date();

    if (this.fileToUpload) {
      console.log(`Detected file upload. Sending file`);
      chatMessage.fileName = this.fileToUpload.name;
      this.chatService.sendFile(this.fileToUpload).subscribe(location => {
        console.log(`ChatMessageComponent: Uploaded file location ${location}`);
        chatMessage.fileLocation = location;
        this.doSendMessage(chatMessage);
        this.fileToUpload = null;
        this.fileInput.nativeElement.value = "";
      });
    } else {
      this.doSendMessage(chatMessage);
    }
  }

  private doSendMessage(chatMessage) {
    console.log(`Sending message '${chatMessage.content}' at ${chatMessage.timestamp}`);
    this.chatService.sendMessage(chatMessage);
    this.message = "";
  }

  handleFileInput(files: any) {
    this.fileToUpload = files.item(0);
    if (this.fileToUpload) {
      console.log(`Uploaded file ${this.fileToUpload.name}, size ${this.fileToUpload.size}`);
    }
  }
}
