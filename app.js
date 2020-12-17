/**
 * app.js
 */
const express = require('express');
const path = require('path');
const database = require('./helpers/database');
const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.static('client/build'));

//Files to API routing
const api = {
    account: require('./api/account'),
    profile: require('./api/profile'),
    link: require('./api/link')
};

//API routes to handle account information and login
app.use('/api/account', api.account);

//API routes to public profile information
app.use('/api/profile', api.profile);

//API routes to handle links information
app.use('/api/link', api.link);

//Route to front-end
app.get('*', (req, res) => {
    return res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });

/**
 * @desc Start the connection with the database and start the server
 */
database
.then(()=>{
    app.listen(PORT, ()=>console.info(`The server is running on server ${PORT}`));
})
.catch((err)=>{
    console.error(`\n\n${err.message}\n\n`);
    process.exit(0);
})