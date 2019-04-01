import { Inject, Injectable } from "@angular/core";
import { User } from "./user";
import { SocketioService } from "./socketio.service";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class UserService {
  private _loggedInUser: User;

  constructor(
    @Inject("LOCALSTORAGE") private localStorage: any,
    private socketIo: SocketioService,
    private router: Router
  ) {
    this.socketIo.socket.on("connection_created", () => {
      console.log(`Created new connection to server`);

      if (this.loggedInUser) {
        console.log(
          `User ${this.loggedInUser.name} is logged into the client. Automatically creating connection on server`
        );
        this.socketIo.socket.emit("register_user", this.loggedInUser);
      }
    });

    this.socketIo.socket.on("registered_users", msg => {
      const jsonUsers = JSON.parse(msg);
      console.log(msg);
    });
  }

  login(user: User) {
    this.localStorage.setItem("loggedInUser", JSON.stringify(user));
    this.socketIo.socket.emit("register_user", user);
  }

  logout() {
    if (this.loggedInUser) {
      console.log(`Logging out user ${this.loggedInUser.name}`);
      this.localStorage.removeItem("loggedInUser");
      this.socketIo.socket.emit("logout_user", JSON.stringify(this.loggedInUser));
      this._loggedInUser = null;
      this.router.navigate([""]);
    }
  }

  get loggedInUser(): User {
    if (!this._loggedInUser) {
      this._loggedInUser = this.retrieveLoggedInUserFromLocalStorage();
    }

    return this._loggedInUser;
  }

  private retrieveLoggedInUserFromLocalStorage(): User {
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
