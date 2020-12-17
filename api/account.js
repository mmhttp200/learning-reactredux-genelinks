/**
 * account.js
 */
const express = require('express');
const {body} = require('express-validator');
const authSession = require('../middlewares/authSession');
const route = express.Router();

//Controllers to handle account routes
const AccountLogin = require('../controllers/AccountLogin');
const AccountInformation = require('../controllers/AccountInformation');
const AccountRegistration = require('../controllers/AccountRegistration');
const AccountUpdateEmail = require('../controllers/AccountUpdateEmail');
const AccountUpdatePassword = require('../controllers/AccountUpdatePassword');
const AccountDelete = require('../controllers/AccountDelete');

route.post('/login', [
    body('email').isEmail(),
    body('password').isLength({min: 8, max: 15})
], AccountLogin);

/**
 * @desc Get account information, including links.
 */
route.post('/account-information', authSession, AccountInformation);

route.post('/create-new-account', [
    body('fullname').isLength({min: 4}),
    body('email').isEmail(),
    body('password').isLength({min: 8, max: 15}),
    body('re_password').custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('Password confirmation does not match password');
        }   
        // Indicates the success of this synchronous custom validator
        return true;
      })
], AccountRegistration);

route.patch('/update-email', authSession, [
    body('new_email').isEmail()
], AccountUpdateEmail);

route.patch('/update-password', authSession, [
    body('new_password').isLength({min: 8, max: 15})
], AccountUpdatePassword);

route.delete('/delete-account', authSession, AccountDelete);

module.exports = route;