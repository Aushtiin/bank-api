const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema(
  {
    number: {
      type: Number,
    },

    type: {
      type: String,
      enum: ["CURRENT", "SAVINGS"],
    },

    owner: {
      type: mongoose.Schema.objectid,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Account = mongoose.model('Account', 'accountSchema');


module.exports = Account