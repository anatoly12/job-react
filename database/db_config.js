const mongoose = require('mongoose');
const dbUrl = process.env.MONGODB_URI || 'mongodb://localhost:27017/job-reactor';

mongoose.connect(dbUrl);
const db = mongoose.connection;

db.on('error', (error) => {
  console.log('There was an error with the database: ', error);
});

db.once('open', (status) => {
  console.log('Database is running.')
});

module.exports = db;