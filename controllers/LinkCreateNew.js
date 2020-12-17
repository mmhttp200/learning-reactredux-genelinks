/**
 * LinkCreateNew.js
 */
const {validationResult} = require('express-validator');
const Link = require('../models/Link');

async function LinkCreateNew(req, res, next){
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(200).json({success: false, message: "Please, check the link informations.", errors: errors.array() });
    }

    const user_id = req.body.user_id;
    const link_type = req.body.link_type;
    const link_uri = req.body.link_uri;

    const newLink = new Link();
    const result = await newLink.create(user_id, link_type, link_uri);

    return res.status(200).json(result);

}

module.exports = LinkCreateNew;