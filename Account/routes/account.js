const express = require('express');
const { authenticate } = require('../../middleware/auth');
const validate = require('../../middleware/validate');
const transfer = require('../policy');
const { catchErrors } = require('../../User/controller');
const { Account } = require('../../models/account');
const router = express.Router();

router.post('/transfer', authenticate, validate(transfer), catchErrors(async (req, res) => {
    const { accountNumber, amount } = req.body

    let recievingAccount = await Account.findOne({number: accountNumber});
    if (!recievingAccount) return res.status(400).send('We could not validate the recieving account please verify the number');

    const { _id, number: myAccountNumber } = req.decoded;

    if(accountNumber === myAccountNumber) return res.status(400).send('You cannot perform this transaction');

    let myAccount = await Account.findOne({ owner: _id, number: myAccountNumber });

    if (myAccount.balance < Math.abs(amount)) return res.status(400).send("Insufficient balance");

    myAccount.balance -= Math.abs(amount);
    await myAccount.save();

    recievingAccount.balance += Math.abs(amount);
    await recievingAccount.save();


    return res.send('Transfer successful');
}))

router.get('/myAccount', authenticate, catchErrors(async (req, res) => {
    const { _id, number: myAccountNumber } = req.decoded;
    
    const account = await Account
    .findOne({owner: _id, number: myAccountNumber})
    .populate({
        path: 'owner',
        select: 'name email',
        model: 'User'
    });
    return res.send(account)
}))

module.exports = router;