require('dotenv').config();
var express = require('express')
var path = require('path')
var cors = require('express-cors')
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

const app = express()

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

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '/../client/dist/index.html'))
});

app.listen(process.env.PORT || 3000, function () {
  console.log(`Server is listening on PORT ${process.env.port || 3000}`)
});