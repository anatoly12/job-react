const mongoose = require('mongoose');
const Promise = require('bluebird');
const User = require('./models/users.js');
Promise.promisifyAll(mongoose);

module.exports.storeJobPosting = (postDetails) => {
  
}