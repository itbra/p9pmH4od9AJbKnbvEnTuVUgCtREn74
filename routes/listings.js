"use strict";

var dataProvider = require('../lib/dataprovider/listings.js'),
    query   = require('querystring'),
    express = require('express'),
    router  = express.Router();

/* GET listings. */
router.get('/', function(req, res) {
  var listings = dataProvider.getListings();

  res.render('listings', {
    title: 'Listings',
    debug: req.query.debug,
    test:  req.query.test,
    pageTestScript: '/qa/tests-listings.js',
    url: {
      host:  req.hostname,
      path:  req.path,
      url:   req.url,
      route: req.route || req.url,
      query: query.stringify(req.query)
    },
    data: {
      listings: listings
    }
  });
});

// No match. Send error.
router.get('*', function(req, res) {
  //FIXME - render error page
  res.send('Bad Route');
});

module.exports = router;
