class Room {
  constructor(name, participants) {
    this._name = name;
    this._messages = [];
    this._participants = participants;
  }

  get name() {
    return this._name;
  }

  set name(value) {
    this._name = value;
  }

  get participants() {
    return this._participants;
  }

  set participants(value) {
    this._participants = value;
  }

  get messages() {
    return this._messages;
  }

  addMessage(msg) {
    this._messages.push(msg);
  }
}

module.exports = Room;
