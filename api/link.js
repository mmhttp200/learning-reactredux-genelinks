/**
 * link.js
 */
const express = require('express');
const {body} = require('express-validator');
const authSession = require('../middlewares/authSession');
const route = express.Router();

//Controllers to handle link routes
const LinkCreateNew = require('../controllers/LinkCreateNew');
const LinkDelete = require('../controllers/LinkDelete');
const LinkTypes = require('../controllers/LinkTypes');

route.post('/create-new-link', authSession, [
    body('link_type'),
    body('link_uri')
], LinkCreateNew);

route.delete('/delete-link', authSession, [
    body('link_id')
], LinkDelete);

route.post('/types-of-links', authSession, LinkTypes);

module.exports = route;