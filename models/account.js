const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
const User = require('./user')

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
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    balance: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

const Account = mongoose.model('Account', accountSchema);

function validateAccount(account) {
  const schema = Joi.object({
    number: Joi.number().required(),
    type: Joi.string().required(),
    owner: Joi.objectId().required()
  })
  return schema.validate(account)
}


module.exports = {
  Account,
  validateAccount
}