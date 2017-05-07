const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = mongoose.Schema({
  // email: { type: String, unique: true, required: true },
  // password: { type: String, unique: true, required: true },
  // creation_time: { type: Date, default: Date.now },
  user_id: String,
  entries: [{
    created_at: {type: Date, default: Date.now},
    audio: {
      bucket: String,
      key: String
    },
    text: String
  }]
});

const User = mongoose.model('User', UserSchema);

module.exports.User = User;