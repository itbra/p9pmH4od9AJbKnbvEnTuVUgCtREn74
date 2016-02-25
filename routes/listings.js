"use strict";

var express = require('express'),
    router = express.Router();

/* GET listings. */
router.get('/', function(req, res, next) {
  //res.send('respond with a resource');
  res.render('listings', {
    title: 'Listings',
    pageTestScript: '/qa/tests-listings.js',
    showTests: req.query.test
  });

  next();
});

module.exports = router;
