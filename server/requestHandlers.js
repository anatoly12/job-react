const user = require('../database/models/users.js');
const dbh = require('../database/db_helpers');

module.exports.storeJobPosting = (req, res) => {
  const postDetails = Object.assign({}, req.body.params.postDetails, {
    user_id: req.userId
  });
  return dbh.storeJobPosting(postDetails)
  .then(success => {
    res.status(200).send(success);
  })
  .catch(err => {
    consol.elog('RH: error in storeJobPosting', err);
    res.status(500);
  })
}

module.exports.getJobPosting = (req, res) => {
  return dbh.getJobPosting(req.userId)
  .then(success => {
    res.status(200).send(success);
  })
  .catch(err => {
    consol.elog('RH: error in storeJobPosting', err);
    res.status(500);
  })
}
