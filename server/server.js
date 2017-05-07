const express = require('express')
const path = require('path')
const cors = require('express-cors')

const app = express()
const bodyParser = require('body-parser');

const db = require('../database/db_config.js');
const rh = require('./requestHandlers');

app.use(cors({
  allowedOrigins: ['https://site@site.com/']
}))

app.use(express.static(__dirname + '/../client/dist'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/JobPosting', rh.storeJobPosting);
app.get('/JobPosting', rh.getJobPosting)

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '/../client/dist/index.html'))
});

app.listen(process.env.PORT || 3000, function () {
  console.log(`Server is listening on PORT ${process.env.port || 3000}`)
});