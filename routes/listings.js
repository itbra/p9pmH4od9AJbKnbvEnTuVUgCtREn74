"use strict";

var express = require('express'),
    router = express.Router(),
    dataProvider = require('../lib/dataprovider/listings.js');

/* GET listings. */
router.get('/', function(req, res) {
  //res.send('respond with a resource');
  res.render('listings', {
    title: 'Listings',
    url: req.url,
    query: req.query,
    queryJSON: JSON.stringify(req.query),
    test: req.query.test,
    pageTestScript: '/qa/tests-listings.js',
    data: {
      listings: dataProvider.getListings()
    }
  });
});

module.exports = router;
