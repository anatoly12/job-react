const user = require('../database/models/users.js');
const dbh = require('../database/db_helpers');
const logger = require('../logger');

module.exports.storeJobPosting = (req, res) => {
  return dbh.storeJobPosting(req.body.params.postDetails)
  .then(success => {
    res.status(200).send(success);
  })
  .catch(err => {
    logger.error('RH: error in storeJobPosting', err);
    res.status(500).send({ error: 'Failed to store job posting.' });
  });
}

module.exports.getJobPosting = (req, res) => {
  return dbh.getJobPosting()
  .then(success => {
    res.status(200).send(success);
  })
  .catch(err => {
    logger.error('RH: error in getJobPosting', err);
    res.status(500).send({ error: 'Failed to get job posting.' });
  });
}