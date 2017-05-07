const mongoose = require('mongoose');
const Promise = require('bluebird');
const User = require('./models/users.js');
const JobPost = require('./models/jobPost');
Promise.promisifyAll(mongoose);

module.exports.storeJobPosting = (postDetails) => {
  delete postDetails.open;
  console.log('---what is this?7777', postDetails);
  return JobPost(postDetails).saveAsync()
  .catch(err => {
    console.log('DBH: err storing job posting', err);
  })
}