const mongoose = require('mongoose');
const { validateUser, User } = require('../../models/user');
const _ = require('lodash');
const bycrypt = require('bcrypt');
const { Account } = require('../../models/account');

const sendJSONResponse = (res, status, message, data) => {
    res.status(status);
    res.json({
        message,
        data,
    })
};

const catchErrors = (fn) => (req, res, next) => fn(req, res, next).catch(next);

const registerUser = async (req, res) => {
    const user = new User();
    const account = new Account();
  
    const {
      name, email, password, accountType,
    } = req.body;
  
    const existingUser = await User.findOne({ email });
  
    if (existingUser) {
      return sendJSONResponse (res, 400, 'User already exists', null);
    }
  
    user.name = name;
    user.email = email;

    const salt = await bycrypt.genSalt(10);
    user.password = await bycrypt.hash(user.password, salt)
    await user.save();

    const accountNumber = Math.floor(1000000000 + Math.random() * 9000000000);

    account.number = accountNumber;
    account.owner = user._id;
    account.type = accountType

    await account.save()

    const token = user.generateAuthToken();

    const data = {
       user: _.pick(user, ['name', 'email', 'type']),
       account: _pick(account, ['number', 'type', 'balance'])
    }
    return sendJSONResponse(res, 200, 'User was successfully created', data);
}

module.exports = {
    registerUser,
    sendJSONResponse,
}