"use strict";

var dataProvider = require('../lib/dataprovider/listings.js'),
    query   = require('querystring'),
    express = require('express'),
    router  = express.Router();

/* GET listings. */
router.get('/', function(req, res) {
  /* var query2 = req.url.match(/\?/) ? req.url.split('?').pop() : '';
      query2 = query2.length ? '?' + query2 : query2; */

  res.render('listings', {
    title: 'Listings',
    debug: req.query.debug,
    test: req.query.test,
    pageTestScript: '/qa/tests-listings.js',
    url: {
      protocol:  req.protocol,
      host:      req.host,
      port:      req.port,
      path:      req.path,
      url:       req.url,
      origURL:   req.originalURL,
      route:     req.route || req.url,
      queryJSON: JSON.stringify(req.query),
      query:     query.stringify(req.query)
    },
    data: {
      listings: dataProvider.getListings()
    }
  });
});

module.exports = router;
