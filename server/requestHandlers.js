const user = require('../database/models/users.js');
const dbh = require('../database/db_helpers');

module.exports.storeJobPosting = (req, res) => {
  const details = req.body;
  console.log('what are the details??123', details);
  return dbh.
}