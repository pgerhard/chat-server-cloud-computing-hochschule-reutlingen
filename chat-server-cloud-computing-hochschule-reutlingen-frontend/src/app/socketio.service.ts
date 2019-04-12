import { Injectable } from "@angular/core";
import * as io from "socket.io-client";
import { environment } from "../environments/environment";

@Injectable({
  providedIn: "root"
})
export class SocketioService {
  private url = environment.backendUrl;

  private _socket;

  constructor() {
    this._socket = io(this.url);
  }

  get socket() {
    return this._socket;
  }
}
