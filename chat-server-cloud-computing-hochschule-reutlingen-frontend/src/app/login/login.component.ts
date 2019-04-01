import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "../user";
import { UserService } from "../user.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  constructor(private router: Router, private userService: UserService) {}

  ngOnInit() {}

  btnClick() {
    this.router.navigateByUrl("/chatroom");
  }

  loginUser(e) {
    e.preventDefault();
    var username = e.target.elements[0].value;
    if (username.length < 1 || username.length > 20) {
      console.log("Bitte gültige Eingabe");
    } else {
      const user = new User();
      user.name = username;
      this.userService.login(user);
      this.btnClick();
    }
  }
}
