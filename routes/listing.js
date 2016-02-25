"use strict";

var express = require('express'),
    router = express.Router(),
    dataProvider = require('../lib/dataprovider/listings.js');

/* GET listing. */
router.get('/', function(req, res) {
  var lid = req.query.id;

  //res.send('respond with a resource');
  res.render('listing', {
    title: 'Listing' + (isNaN(lid) ? '' : ' #' + lid),
    url: req.url,
    query: req.query,
    queryJSON: JSON.stringify(req.query),
    test: req.query.test,
    pageTestScript: '/qa/tests-listing.js',
    data: {
      listing: dataProvider.getListing(lid)
    }
  });
});

module.exports = router;
