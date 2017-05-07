const express = require('express')
const path = require('path')
const cors = require('express-cors')

const app = express()

const db = require('../database/db_config.js');
const rh = require('./requestHandlers');

app.use(cors({
  allowedOrigins: ['https://site@site.com/']
}))

app.use(express.static(__dirname + '/../client/dist'))

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '/../client/dist/index.html'))
})

app.post('/storeJobPosting', rh.storeJobPosting);

app.listen(process.env.PORT || 3000, function () {
  console.log(`Server is listening on PORT ${process.env.port || 3000}`)
})