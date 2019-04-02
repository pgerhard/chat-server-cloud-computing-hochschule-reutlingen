export class Room {
  private _name: string;

  private _identifier: string;

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get identifier(): string {
    return this._identifier;
  }

  set identifier(value: string) {
    this._identifier = value;
  }
}
