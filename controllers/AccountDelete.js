/**
 * AccountDelete.js
 */
const {validationResult} = require('express-validator');
const Account = require('../models/Account');

async function AccountDelete(req, res, next){
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(200).json({success: false, message: "Please, check your email, password, and confirmation password.", errors: errors.array() });
    }

    const user_id = req.body.user_id;

    const newAccount = new Account();
    const result = await newAccount.delete(user_id);

    return res.status(200).json(result);

}

module.exports = AccountDelete;