const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { randomBytes, pbkdf2Sync } = require("crypto");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    lowercase: true,
    trim: true,
    required: true,
    minlength: 3,
    maxlength: 200,
  },

  email: {
    type: String,
    unique: true,
  },

  blocked: {
    type: Boolean,
    default: false,
  },

  hash: String,

  salt: String,
});

UserSchema.methods.generateAuthToken = function (number) {
  const token = jwt.sign(
    {
      _id: this._id,
      name: this.name,
      email: this.email,
      number,
    },
    process.env.SECRET
  );
  return token;
};

UserSchema.methods.setPassword = function userPassword(password) {
  this.salt = randomBytes(16).toString("hex");
  this.hash = pbkdf2Sync(password, this.salt, 100, 64, "sha512").toString("hex");
};

UserSchema.methods.verifyPassword = function verify(password) {
  const hash = pbkdf2Sync(password, this.salt, 100, 64, "sha512").toString("hex");
  return this.hash === hash;
};

const User = mongoose.model("User", UserSchema);

module.exports = {
  User,
};
