const crypto = require("crypto");
const bcrypt = require("bcrypt");

class Encoder {
  constructor() {
    this.bcryptSaltRounds = 10;
  }

  async bcryptHash(plainText) {
    return bcrypt.hash(plainText, this.bcryptSaltRounds);
  }

  async md5Hash(plainText) {
    return new Promise((resolve, reject) => {
      let hash = crypto
        .createHash("md5")
        .update(plainText)
        .digest("hex");
      resolve(hash);
    });
  }
}

module.exports = Encoder;
