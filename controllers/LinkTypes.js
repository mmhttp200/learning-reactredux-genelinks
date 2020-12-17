/**
 * LinkTypes.js
 */
const {validationResult} = require('express-validator');
const Link = require('../models/Link');

async function LinkTypes(req, res, next){

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(200).json({success: false, message: "Please, check the link informations.", errors: errors.array() });
    }

    const newLink = new Link();
    const result = await newLink.getLinkTypes();

    return res.status(200).json(result);

}

module.exports = LinkTypes;