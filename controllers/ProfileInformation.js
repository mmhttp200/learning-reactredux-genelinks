/**
 * ProfileInformation.js
 */
const Account = require('../models/Account');

async function ProfileInformation(req, res, next){

    if(!req.params.nanoid) return res.status(200).json({success: false, message: "Access not authorized."});

    const nanoid = req.params.nanoid.toUpperCase();
    const nanoid_regex = /[A-Z1-9]{10}$/;
    const result_regex = nanoid_regex.test(nanoid);
    if(!result_regex) return res.status(200).json({success: false, message: "Access not authorized."});

    const newAccount = new Account();
    const result = await newAccount.getInformationByNanoID(nanoid);

    return res.status(200).json(result);

}

 module.exports = ProfileInformation;