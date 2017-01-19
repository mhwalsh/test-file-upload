var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');

var uploads = require('./routes/uploads');

var app = express();

var mongoURI = "mongodb://localhost:27017/mean-multer-ngf"; // replace with your mongodb url

var MongoDB = mongoose.connect(mongoURI).connection;
MongoDB.on('error', function (err) {
  if (err) {
    console.log('mongodb connection error', err);
  } else {
    console.log('mongodb connection successful');
  }
});

MongoDB.once('open', function () {
  console.log('mongodb connection open');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/upload', uploads);

// set up routes
app.use(express.static('public'));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'public/views/index.html'));
});

var server = app.listen(3000, function(){
  var port = server.address().port;
  console.log('Listening on port: ', port);
});

module.exports = app;
