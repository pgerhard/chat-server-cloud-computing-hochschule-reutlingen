import { Component, OnInit } from "@angular/core";
import { UserService } from "./user.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    if (this.userService.loggedInUser) {
      console.log(`Logged in as ${this.userService.loggedInUser.name}`);
      this.router.navigate(["chatroom"]);
    } else {
      console.log(`Could not find a logged in user`);
      this.router.navigate(["login"]);
    }
  }
}
