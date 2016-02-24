"use strict";

var express = require('express'),
    router = express.Router();

/* GET listing. */
router.get('/', function(req, res, next) {
  //res.send('respond with a resource');
  res.render('listing', {
    title: 'Listing',
    showTests: req.query.test
  });

  next();
});

module.exports = router;
