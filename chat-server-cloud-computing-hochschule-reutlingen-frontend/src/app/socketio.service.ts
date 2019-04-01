import { Injectable } from "@angular/core";
import * as io from "socket.io-client";

@Injectable({
  providedIn: "root"
})
export class SocketioService {
  private url = "http://localhost:3000";

  private _socket;

  constructor() {
    this._socket = io(this.url);
  }

  get socket() {
    return this._socket;
  }
}
