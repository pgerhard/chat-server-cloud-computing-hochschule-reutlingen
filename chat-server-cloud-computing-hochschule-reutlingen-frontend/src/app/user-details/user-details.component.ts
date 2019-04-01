import { Component, OnInit } from "@angular/core";
import { UserService } from "../user.service";

@Component({
  selector: "app-user-details",
  templateUrl: "./user-details.component.html",
  styleUrls: ["./user-details.component.scss"]
})
export class UserDetailsComponent implements OnInit {
  constructor(private userService: UserService) {}

  ngOnInit() {}
  retrieveUsername() {
    return this.userService.loggedInUser.name;
  }

  logout() {
    this.userService.logout();
  }
}
