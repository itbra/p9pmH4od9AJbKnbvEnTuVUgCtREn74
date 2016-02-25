"use strict";

var express = require('express'),
    router = express.Router();

/* GET listing. */
router.get('/', function(req, res, next) {
  //res.send('respond with a resource');
  res.render('listing', {
    title: 'Listing' + (isNaN(req.query.id) ? '' : '#' + req.query.id),
    pageTestScript: '/qa/tests-listing.js',
    showTests: req.query.test
  });

  next();
});

module.exports = router;
