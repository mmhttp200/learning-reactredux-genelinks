const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AccountSchema = new Schema({

    fullname: {
        required: true,
        type: String
    },
    nanoid: {
        required: true,
        unique: true,
        type: String
    },
    email: {
        required: true,
        unique: true,
        type: String
    },
    password: {
        required: true,
        type: String
    }

});

module.exports = mongoose.model('account', AccountSchema);