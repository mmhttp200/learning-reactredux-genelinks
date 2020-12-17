/**
 * AccountRegistration.js
 */
const {validationResult} = require('express-validator');
const Account = require('../models/Account');

async function AccountRegistration(req, res, next){

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(200).json({success: false, message: "Please, check your email, password, and confirmation password.", errors: errors.array() });
    }

    const fullname = req.body.fullname;
    const email = req.body.email;
    const password = req.body.password;
    const re_password = req.body.re_password;

    const newAccount = new Account();
    const result = await newAccount.register(fullname, email, password, re_password);

    return res.status(200).json(result);

}

module.exports = AccountRegistration;