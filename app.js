
var express = require('express');

var bodyParser = require('body-parser');

var app = express();

var config = require('./config');

var core = require('./core')(config);

app.use(bodyParser.urlencoded({ extended: false }));

if (config['enable_slack_command']) {
  var slack = require('./plugins/slack')(core, config);
  app.post('/slack', slack);
}

module.exports = app;
