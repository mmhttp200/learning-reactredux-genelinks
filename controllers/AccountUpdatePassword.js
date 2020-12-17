/**
 * AccountUpdatePassword.js
 */
const {validationResult} = require('express-validator');
const Account = require('../models/Account');

async function AccountUpdatePassword(req, res, next){

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(200).json({success: false, message: "Your password can have between 8 and 15 alphanumeric characters.", errors: errors.array() });
    }

    const user_id = req.body.user_id;
    const new_password = req.body.new_password;

    const newAccount = new Account();
    const result = await newAccount.updatePassword(user_id, new_password);

    res.status(200).json(result);

}

module.exports = AccountUpdatePassword;