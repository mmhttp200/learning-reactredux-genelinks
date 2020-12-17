const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LinkSchema = new Schema({

    user_id: {
        required: true,
        type: String
    },
    type: {
        required: true,
        type: String
    },
    uri: {
        required: true,
        type: String
    }

});

module.exports = mongoose.model('link', LinkSchema);