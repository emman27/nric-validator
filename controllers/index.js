'use strict';

const express = require('express'),
  router = express.Router();

router.use('/api', require('./api.js'));
router.get('/', (req, res) => {res.redirect('http://docs.nricvalidator.apiary.io/#');});
// router.use('/', require('./default.js'));

module.exports = router;
