/**
 * LinkDelete.js
 */
const {validationResult} = require('express-validator');
const Link = require('../models/Link');

async function LinkDelete(req, res, next){
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(200).json({success: false, message: "Please, check the link informations.", errors: errors.array() });
    }

    const user_id = req.body.user_id;
    const link_id = req.body.link_id;

    const newLink = new Link();
    const result = await newLink.delete(user_id, link_id);

    return res.status(200).json(result);

}

module.exports = LinkDelete;