/**
 * database.js
 */
const mongoose = require('mongoose');

/**
 * @desc Do the connection to MONGODB Atlas using mongoose
 * @param process.env.MONGODB_URI
 * @returns {promise}
 */
async function database(){
    return await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true,
                                                             useUnifiedTopology: true,
                                                             useCreateIndex: true, 
                                                             useFindAndModify: false });
}

module.exports = database();