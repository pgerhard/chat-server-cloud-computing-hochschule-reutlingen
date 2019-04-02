import { Inject, Injectable } from "@angular/core";
import { User } from "./user";
import { SocketioService } from "./socketio.service";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class UserService {
  private loggedInUserKey: string = "loggedInUser";

  private _loggedInUser: User;

  private _loggedInUsers: User[] = [];

  constructor(@Inject("LOCALSTORAGE") private localStorage: any, private socketIo: SocketioService, private router: Router) {
    this.socketIo.socket.on("connection_created", () => {
      console.log(`Created new connection to server`);

      if (this.loggedInUser) {
        console.log(`User ${this.loggedInUser.name} is logged into the client. Automatically creating connection on server`);
        this.socketIo.socket.emit("register_user", this.loggedInUser);
      }
    });

    this.socketIo.socket.on("registered_users", msg => {
      let parent = this;
      this._loggedInUsers = [];
      const jsonUsers = JSON.parse(msg);
      jsonUsers.forEach(function(jsonUser) {
        let user = Object.create(User.prototype);
        parent._loggedInUsers.push(Object.assign(user, jsonUser));
      });
    });
  }

  login(user: User) {
    this.localStorage.setItem(this.loggedInUserKey, JSON.stringify(user));
    this.socketIo.socket.emit("register_user", user);
  }

  logout() {
    if (this.loggedInUser) {
      console.log(`Logging out user ${this.loggedInUser.name}`);
      this.localStorage.removeItem(this.loggedInUserKey);
      this.socketIo.socket.emit("logout_user", this.loggedInUser);
      this._loggedInUser = null;
      this.router.navigate([""]);
    }
  }

  loggedInUsers(): User[] {
    return this._loggedInUsers;
  }

  get loggedInUser(): User {
    if (!this._loggedInUser) {
      this._loggedInUser = this.retrieveLoggedInUserFromLocalStorage();
    }

    return this._loggedInUser;
  }

  private retrieveLoggedInUserFromLocalStorage(): User {
    let jsonUser = JSON.parse(this.localStorage.getItem(this.loggedInUserKey));
    if (jsonUser) {
      const user = new User();
      user.name = jsonUser._name;
      user.date = new Date().toString();
      return user;
    } else {
      return null;
    }
  }

  findUserByName(userName: string): User {
    return this._loggedInUsers.filter(user => user.name === userName)[0];
  }
}
