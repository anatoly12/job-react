const user = require('../database/models/users.js');
const dbh = require('../database/db_helpers');

module.exports.storeJobPosting = (req, res) => {
  return dbh.storeJobPosting(req.body.params.postDetails)
  .then(success => {
    res.status(200).send(success);
  })
  .catch(err => {
    console.log('RH: error in storeJobPosting', err);
    res.status(500);
  })
}

module.exports.getJobPosting = (req, res) => {
  return dbh.getJobPosting()
  .then(success => {
    res.status(200).send(success);
  })
  .catch(err => {
    console.log('RH: error in storeJobPosting', err);
    res.status(500);
  })
}

module.exports.storeAnalyticsEvent = (req, res) => {
  return dbh.storeAnalyticsEvent(req.body)
  .then(() => {
    res.sendStatus(201);
  })
  .catch(err => {
    console.log('RH: error in storeAnalyticsEvent', err);
    res.status(400).send({ error: 'Unable to record analytics event' });
  });
}
