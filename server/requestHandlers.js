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

module.exports.trackAnalyticsEvent = (req, res) => {
  if (!req.body || !req.body.eventName) {
    return res.status(400).send({ error: 'eventName is required' });
  }

  return dbh.storeAnalyticsEvent(req.body)
  .then(() => {
    res.sendStatus(204);
  })
  .catch(err => {
    consol.elog('RH: error in trackAnalyticsEvent', err);
    res.status(500).send({ error: 'Failed to store analytics event' });
  });
}
