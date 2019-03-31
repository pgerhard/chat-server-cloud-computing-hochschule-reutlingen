import { Component, OnInit } from "@angular/core";
import { UserService } from "../user.service";
import {ChatMessageComponent} from "../chat-message/chat-message.component";
import {ChatService} from "../chat.service";

@Component({
  selector: "app-chat",
  templateUrl: "./chat.component.html",
  styleUrls: ["./chat.component.scss"]
})
export class ChatComponent implements OnInit {


  constructor(public userService: UserService, public chatService: ChatService) {

  }

  ngOnInit() {

  }
}
