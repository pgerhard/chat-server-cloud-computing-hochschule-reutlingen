class Room {
  constructor(name, participants) {
    this._name = name;
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
}

module.exports = Room;
