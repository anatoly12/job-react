require('dotenv').config();
var express = require('express');
var path = require('path');
var cors = require('express-cors');
const bodyParser = require('body-parser');
const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const s3 = new AWS.S3();
const database = require('../database/dbHelper');

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_S3_BUCKET,
    metadata: (req, file, cb) => {
      cb(null, {fieldName: file.fieldname});
    },
    key: (req, file, cb) => cb(null, Date.now().toString())
  })
});

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'us-west-1'
});

var axios = require('axios')
const app = express();

const db = require('../database/db_config.js');
const rh = require('./requestHandlers');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(require('morgan')('dev'));
app.use(cors({
  allowedOrigins: ['https://site@site.com/']
}))

app.use(express.static(__dirname + '/../client/dist'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/storeJobPosting', rh.storeJobPosting);

app.post('/entry', upload.single('media'), (req, res) => {
  if (req.body.text.length === 0) {
    res.sendStatus(400);
  }
  let log = {
    user_id: req.body.user_id ? user_id : '123',
    audio: {
      bucket: req.file ? req.file.bucket : null,
      key: req.file ? req.file.key : null,
    },
    text: req.body.text,
  };
  database.saveEntry(req, res, log);

});

app.post('/db/retrieveEntry', (req, res) => {
  let query = {};
  query.user_id = req.body.user_id ? req.body.user_id : '123';
  database.retrieveEntry(query)
  .then((results) => {
    res.send(results);
  })
  .catch( err => {
    console.error(err);
  });
});

const getAWSSignedUrl = (bucket, key) => {
  const params = {
    Bucket: bucket,
    Key: key
  };
  return s3.getSignedUrl('getObject', params);
};

app.get('/entry/:entryId', (req, res) => {
  let query = {};
  query.entryId = req.params.entryId;
  query.user_id = '123';
  database.retrieveEntryMedia(query)
  .then( result => {
    let key = result[0].audio.key;;
    let bucket = result[0].audio.bucket;
    let url = getAWSSignedUrl(bucket, key);
    res.send(JSON.stringify(url));
  })
  .catch( err => res.sendStatus(400).send(err));
});


app.post('/setReminder', function (req, res) {
  // convert date and time from zulu to PDT

  const date = req.body.reminderDate;
  const time = req.body.reminderTime;
  const followDate = req.body.followUpDate;

  const followUpDate = followDate.toString().slice(0,11);
  const reminderDate = date.toString().slice(0, 11);
  const reminderTime = time.toString().slice(11, 19);
  const tzAdjust = '-08:00';

  var thankYouTime = reminderDate + reminderTime + tzAdjust;

  // Follow up time to send 5 days after
  var followUpTime = followUpDate + reminderTime + tzAdjust;

  // console.log('thankYouTime', thankYouTime);
  // console.log('followUpTime', followUpTime);

  // Format YYYY-MM-DDTHH:MM:SS±HH:MM. Example: 2017-02-11T08:00:00-04:00.
  // Format start_time for the email


  // Thank you letter reminder
  axios({
    method: 'post',
    url: 'https://api.sparkpost.com/api/v1/transmissions',
    headers: {
      'content-type': 'application/json',
      'authorization': '0526b81c29cb593ff22fd28413a1e139eedbb0ac'
    },
    data: {
      "options":{"open_tracking":true,"click_tracking":true,"start_time": thankYouTime},
      "return_path":"bounces@jobflow.tech",
      "metadata":{"some_useful_metadata":"testing_sparkpost"},
      "substitution_data":{"signature":"JobFlow Reminder"},
      "recipients":[
        {"address":{
          "email":"eddieechou@gmail.com",
          "tags":["reminder"],
          "substitution_data": {
            "customer_type":"Platinum","first_name":"Eddie"
          }}}],
      "content":{
        "from":{"name":"Job Flow","email":"reminders@jobflow.tech"},
        "subject":"Thank-you email reminder",
        "reply_to":"Job Flow",
        "text":"Greetings {{address.first_name}}\r\nCongrats on completing your interview!\r\nCongratulations,\r\n{{signature}}",
        "html":"<strong>Greetings {{address.first_name}},</strong><p>Congratulations on finishing your interview! This is a reminder to send your thank-you email.</p><p>Congrats again!</p>{{signature}}"
      }
    }
  })
  .then((response) => {
    console.log('response: ', response);
    console.log('Success: set up thank-you email reminder at ', thankYouTime);
  })
  .catch((error) => {
    console.log(error)
  });


  // Follow up reminder in 5 days
  axios({
    method: 'post',
    url: 'https://api.sparkpost.com/api/v1/transmissions',
    headers: {
      'content-type': 'application/json',
      'authorization': '0526b81c29cb593ff22fd28413a1e139eedbb0ac'
    },
    data: {
      "options":{"open_tracking":true,"click_tracking":true,"start_time": followUpTime},
      "return_path":"bounces@jobflow.tech",
      "metadata":{"some_useful_metadata":"testing_sparkpost"},
      "substitution_data":{"signature":"JobFlow Reminder"},
      "recipients":[
        {"address":{
          "email":"eddieechou@gmail.com",
          "tags":["reminder"],
          "substitution_data": {
            "customer_type":"Platinum","first_name":"Eddie"
          }}}],
      "content":{
        "from":{"name":"Job Flow","email":"reminders@jobflow.tech"},
        "subject":"Reminder",
        "reply_to":"Job Flow",
        "text":"Greetings {{address.first_name}}\r\nFollow up email!\r\nCongratulations,\r\n{{signature}}",
        "html":"<strong>Greetings {{address.first_name}},</strong><p>You completed your interview at Google 5 days ago. This is a reminder to send an email to follow-up on your application.</p><p>Good luck!</p>{{signature}}"
      }
    }
  })
  .then((response) => {
    console.log('Success: set up follow-up email reminder at ', followUpTime);
  })
  .catch((error) => {
    console.log(error)
  });

  res.sendStatus(200);
});

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '/../client/dist/index.html'))
});

app.listen(process.env.PORT || 3000, function () {
  console.log(`Server is listening on PORT ${process.env.port || 3000}`);
});