const express = require("express");
const { register, login } = require("../policy");
const validate = require("../../middleware/validate");
const router = express.Router();
const { User } = require("../../models/user");
const { Account } = require("../../models/account");
const _ = require("lodash");
const { catchErrors } = require("../controller");

router.post("/register", validate(register), catchErrors(async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already exits");

  user = new User(_.pick(req.body, ["name", "email", "password"]));
  user.setPassword(req.body.password);
  await user.save();

  const accountNumber = Math.floor(1000000000 + Math.random() * 9000000000);

  const account = new Account({
    number: accountNumber,
    type: req.body.accountType,
    owner: user._id,
  });
  await account.save();

  const token = user.generateAuthToken(accountNumber);

  const data = {
    token,
    user: _.pick(req.body, ["name", "email"]),
    account: _.pick(account, ["number", "type", "balance", "owner"]),
  };
  return res.status(200).send(data);
}));

router.post("/login", validate(login), catchErrors(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid login Credentials");

  const validPassword = user.verifyPassword(req.body.password);
  if (!validPassword) return res.send(400).send("Invalid login Credentials");

  const account = await Account.findOne({ owner: user._id });
  const token = user.generateAuthToken(account.number);

  const data = {
    token,
    user: _.pick(user, ["name", "email"]),
    account: _.pick(account, ["number", "type", "balance"]),
  };

  res.send(data);
}));

module.exports = router;
