'use strict';

const express = require('express'),
  app = express(),
  bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));
app.use(require('./controllers'));

app.listen(process.env.PORT || 3000, function() {
  console.log('Listening on port 3000...');
});
