class User {

  constructor(name, socketId) {
    this._name = name;
    this._socketId = socketId;
  }

  get name() {
    return this._name;
  }

  set name(value) {
    this._name = value;
  }

  get socketId() {
    return this._socketId;
  }

  set socketId(value) {
    this._socketId = value;
  }
}

module.exports = User;
