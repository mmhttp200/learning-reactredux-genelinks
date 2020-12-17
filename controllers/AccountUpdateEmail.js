/**
 * AccountUpdateEmail.js
 */
const {validationResult} = require('express-validator');
const Account = require('../models/Account');

async function AccountUpdateEmail(req, res, next){

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(200).json({success: false, message: "Please, check your email, password, and confirmation password.", errors: errors.array() });
    }

    const user_id = req.body.user_id;
    const new_email = req.body.new_email;

    const newAccount = new Account();
    const result = await newAccount.updateEmail(user_id, new_email);

    res.status(200).json(result);

}

module.exports = AccountUpdateEmail;