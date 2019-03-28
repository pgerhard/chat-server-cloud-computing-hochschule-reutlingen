import { Inject, Injectable } from "@angular/core";
import { User } from "./user";

@Injectable({
  providedIn: "root"
})
export class UserService {
  private _loggedInUser: User;

  constructor(@Inject("LOCALSTORAGE") private localStorage: any) {}

  logInUser(user: User) {
    this.localStorage.setItem("loggedInUser", JSON.stringify(user));
  }

  retrieveLoggedInUser(): User {
    let jsonUser = JSON.parse(this.localStorage.getItem("loggedInUser"));
    if (jsonUser) {
      const user = new User();
      user.name = jsonUser._name;
      return user;
    } else {
      return null;
    }
  }
}
