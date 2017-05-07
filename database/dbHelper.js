const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const mongoDatabase = require('./models/users');
const User = mongoDatabase.User;

exports.saveEntry = (req, res, log) => {
  let logEntry = {
    created_at: Date.now(),
    audio: {
      bucket: log.audio ? log.audio.bucket : null,
      key: log.audio ? log.audio.key : null
    },
    text: log.text,
  };
  User.findOneAndUpdate({user_id: log.user_id}, {
    $push: {'entries': logEntry}
  }, {safe: true, upsert: true, new: true})
  .then(() => {
    res.sendStatus(201);
  })
  .error(err => res.sendStatus(500).send(err))
  .catch(err => res.sendStatus(400).send(err));
};
