/**
 * authSession.js
 */
const jwt = require('jsonwebtoken');

async function authSession(req,res,next){

    const token = req.get('token');
    if(!token) return res.status(300).json({success: false, message: "Access not authorized."});
    
    const payload = await jwt.verify(`${token}`, `${process.env.JWT_SECRET_KEY}`);
    if(!payload.id) return res.status(200).json({success: false, message: "Access not authorized."});

    req.body.user_id = payload.id;

    next();
};

module.exports = authSession;