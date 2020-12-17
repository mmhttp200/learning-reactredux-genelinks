/**
 * AccountInformation.js
 */
const Account = require('../models/Account');

async function AccountInformation(req, res, next){
    
    const id = req.body.user_id;

    const newAccount = new Account();
    const result = await newAccount.getInformationByID(id);

    return res.status(200).json(result);

}

 module.exports = AccountInformation;