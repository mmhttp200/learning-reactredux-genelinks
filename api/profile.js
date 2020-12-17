/**
 * profile.js
 */
const express = require('express');
const route = express.Router();

//Controllers to handle profile routes
const ProfileInformation = require('../controllers/ProfileInformation');

route.get('/profile-information/:nanoid', ProfileInformation);

module.exports = route;