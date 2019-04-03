import { Component, OnInit } from "@angular/core";
import { UserService } from "../user.service";
import { User } from "../user";
import {ChatService} from "../chat.service";

@Component({
  selector: "app-user-details",
  templateUrl: "./user-details.component.html",
  styleUrls: ["./user-details.component.scss"]
})
export class UserDetailsComponent implements OnInit {
  constructor(private userService: UserService,private chatService: ChatService) {}

  ngOnInit() {}

  retrieveUsername() {
    return this.userService.loggedInUser.name;
  }

  loggedInUsers(): User[] {
    return this.userService.loggedInUsers();
  }

  logout() {
    this.userService.logout();
  }
}
