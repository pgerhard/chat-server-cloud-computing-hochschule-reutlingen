import { Inject, Injectable } from "@angular/core";
import { User } from "./user";
import {DateFormatter} from "@angular/common/src/pipes/deprecated/intl";
import {ChatService} from "./chat.service";

@Injectable({
  providedIn: "root"
})
export class UserService {
  private _loggedInUser: User;


  constructor(@Inject("LOCALSTORAGE") private localStorage: any) {}

  logInUser(user: User) {
    this.localStorage.setItem("loggedInUser", JSON.stringify(user));
  }

  get loggedInUser(): User {
    return this._loggedInUser;
  }

  retrieveLoggedInUser(): User {
    let jsonUser = JSON.parse(this.localStorage.getItem("loggedInUser"));
    if (jsonUser) {
      const user = new User();
      user.name = jsonUser._name;
      user.date = new Date().toString();




      return user;
    } else {
      return null;
    }
  }

}
