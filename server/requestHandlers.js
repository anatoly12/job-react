const user = require('../database/models/users.js');
const dbh = require('../database/db_helpers');

module.exports.storeJobPosting = (req, res) => {
  return dbh.storeJobPosting(req.body.params.postDetails)
  .then(success => {
    res.status(200).send(success);
  })
  .catch(err => {
    consol.elog('RH: error in storeJobPosting', err);
    res.status(500);
  })
}

module.exports.getJobPosting = (req, res) => {
  return dbh.getJobPosting()
  .then(success => {
    res.status(200).send(success);
  })
  .catch(err => {
    consol.elog('RH: error in storeJobPosting', err);
    res.status(500);
  })
}