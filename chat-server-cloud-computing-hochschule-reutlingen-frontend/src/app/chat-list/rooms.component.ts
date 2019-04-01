import { Component, OnInit } from "@angular/core";
import { ChatService } from "../chat.service";
import { Room } from "../room";

@Component({
  selector: "app-rooms",
  templateUrl: "./rooms.component.html",
  styleUrls: ["./rooms.component.scss"]
})
export class RoomsComponent implements OnInit {
  constructor(private chatService: ChatService) {}

  ngOnInit() {}

  retrieveRooms(): Room[] {
    return this.chatService.getRooms();
  }
}
