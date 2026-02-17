const mongoose = require('mongoose');
const Promise = require('bluebird');
mongoose.Promise = Promise;
const mongoDatabase = require('./models/users');
const User = mongoDatabase.User;

exports.saveEntry = (log = {}) => {
  if (!log.user_id) {
    return Promise.reject(new Error('user_id is required to save entry'));
  }
  let logEntry = {
    created_at: Date.now(),
    audio: {
      bucket: log.audio ? log.audio.bucket : null,
      key: log.audio ? log.audio.key : null
    },
    text: log.text,
  };
  return User.findOneAndUpdate({user_id: log.user_id}, {
    $push: {'entries': logEntry}
  }, {safe: true, upsert: true, new: true});
};

exports.retrieveEntry = (query) => {
  let user_id = query.user_id;
  return new Promise((resolve, reject) => {
    User.aggregate([
      {$match: {user_id: user_id} },
      {$unwind: '$entries'},
      {$sort: {'entries.created_at': -1}},
      {$limit: 20 },
      {$project: {'entries._id': 1, 'entries.text': 1, 'entries.created_at': 1}},
      {$group: {_id: '$_id', 'entries': {$push: '$entries'}}},
      {$project: {'entries': '$entries'}},
    ])
    .then( results => {
      if (results[0] === undefined) {
        resolve(results);
      } else {
        resolve(results[0].entries);
      }
    })
    .error((err) => {
      reject(err);
    });
  });
};

exports.retrieveEntryMedia = (query) => {
  let user_id = query.user_id;
  let entryId = query.entryId;
  return new Promise((resolve, reject) => {
    User.find({user_id: user_id}, { entries: {$elemMatch: {_id: entryId}}, 'entries.audio': 1, 'entries._id': 1} )
    .then( (results) => {
      if (results[0] === undefined) {
        throw 'no entries found with entryId';
      } else {
        resolve(results[0].entries);
      }
    })
    .catch( err => {
      reject(err);
    });
  });
};
