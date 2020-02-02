'use strict';
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const http = require('http').Server(app);
const fs = require('fs');
const path = require('path');
const port = 5000;

function handleError(req, res, error) {
  console.error(error.statusCode, error.error, error.options.uri);
  res.send(error.statusCode);
}

/**
* Module variables
*/

app.use('/', express.static(path.join(__dirname, '/')));

app.use(function (req, res) {
  var fileName = __dirname + '/static/index.html';
    fs.readFile(fileName, 'utf8', function (err,data) {
    if (err) {
      console.log(err);
      res.status(404).send({error: 'index not found', url: req.url});
    } else {
      res.send(data);
    }
  });
});

http.listen(port, '0.0.0.0', function(){
  console.log('Listening on *:' + port);
});
