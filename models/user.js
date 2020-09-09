const mongoose = require("mongoose");

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
    match: [
      /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/,
      "Please add a valid email",
    ],
    unique: true,
  },

  blocked: {
    type: Boolean,
    default: false,
  },
});

const User = new mongoose.model("User", userSchema);

module.exports = User;