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
    if (!this.userService.retrieveLoggedInUser()) {
      console.log(
        `Logged in User is ${this.userService.retrieveLoggedInUser()}`
      );
      this.router.navigate(["login"]);
    } else {
      console.log(`Logged in as ${this.userService.retrieveLoggedInUser()}`);
      this.router.navigate(["chatroom"]);
    }
  }
}
