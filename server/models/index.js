const mongoose = require('mongoose');
const config = require('../config');

mongoose.connect('mongodb+srv://Gustavo_Silva:sessionsAndCookiesClass@firsttry.dpuwp.mongodb.net/gifts_db?retryWrites=true&w=majority').then(
  () => { console.log('Database is connected.'); },
  err => { console.error(err); }
);

module.exports = mongoose;