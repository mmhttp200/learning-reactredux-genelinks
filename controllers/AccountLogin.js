/**
 * AccountLogin.js
 */
const {validationResult} = require('express-validator');
const Account = require('../models/Account');

async function AccountLogin(req, res, next){

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(200).json({success: false, message: "Please, check your email, password, and confirmation password.", errors: errors.array() });
    }

    const email = req.body.email;
    const password = req.body.password;

    const newAccount = new Account();
    const result = await newAccount.login(email, password);

    return res.status(200).json(result);

}

module.exports = AccountLogin;