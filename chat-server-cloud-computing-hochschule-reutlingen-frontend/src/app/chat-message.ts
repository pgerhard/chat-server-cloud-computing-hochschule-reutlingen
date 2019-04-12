import { User } from "./user";
import { MessageType } from "./message-type";

export class ChatMessage {
  private _sender: User;
  private _content: string;
  private _mood: string;
  private _recipients: User[] = [];
  private _type: MessageType;
  private _timestamp: Date;
  private _fileLocation: string;
  private _fileName: string;

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

  get mood(): string {
    return this._mood;
  }

  set mood(value: string) {
    this._mood = value;
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

  get fileLocation(): string {
    return this._fileLocation;
  }

  set fileLocation(value: string) {
    this._fileLocation = value;
  }

  get fileName(): string {
    return this._fileName;
  }

  set fileName(value: string) {
    this._fileName = value;
  }
}
