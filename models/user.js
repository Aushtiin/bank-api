const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    lowercase: true,
    trim: true,
    required: "Please provide your name",
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

  password: {
    type: String,
    minlength: 8,
    maxlength: 200,
    required: true
  }
});

const User = new mongoose.model("User", userSchema);

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({_id: this._id, blocked: this.blocked}, process.env.JWTKEY);
  return token;
};


module.exports = {
  User,
};