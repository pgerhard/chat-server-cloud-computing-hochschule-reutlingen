import { User } from "./user";
import { MessageType } from "./message-type";

export class ChatMessage {
  private _sender: User;
  private _content: string;
  private _recipients: User[];
  private _type: MessageType;
  private _timestamp: Date;

  get sender(): User {
    return this._sender;
  }

  set sender(value: User) {
    this._sender = value;
  }

  get content(): string {
    return this._content;
  }

  set content(value: string) {
    this._content = value;
  }

  get recipients(): User[] {
    return this._recipients;
  }

  set recipients(value: User[]) {
    this._recipients = value;
  }

  get type(): MessageType {
    return this._type;
  }

  set type(value: MessageType) {
    this._type = value;
  }

  get timestamp(): Date {
    return this._timestamp;
  }

  set timestamp(value: Date) {
    this._timestamp = value;
  }

  getContent() {
    return this._content;
  }
}
