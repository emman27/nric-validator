'use strict';

const express = require('express'),
  router = express.Router();

router.use('/api', require('./api.js'));
// router.use('/', require('./default.js'));

module.exports = router;
