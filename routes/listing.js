"use strict";

var dataProvider = require('../lib/dataprovider/listings.js'),
    query   = require('querystring'),
    express = require('express'),
    router  = express.Router(),
    params  = {
      pageTestScript: '/qa/tests-listing.js',
      url: {},
      data: {}
    };

/* GET listing. */

// With id and alias provided
router.get('/:id?/:alias?', function(req, res) {
  var id = req.params.id;
  /* var query2 = req.url.match(/\?/) ? req.url.split('?').pop() : '';
      query2 = query2.length ? '?' + query2 : query2; */

  params.title = 'Listing' + (isNaN(id) ? '' : ' #' + id);
  params.debug = req.query.debug;
  params.test  = req.query.test;
  params.url   = {
    protocol:  req.protocol,
    host:      req.host,
    port:      req.port,
    path:      req.path,
    url:       req.url,
    origURL:   req.originalURL,
    route:     req.route || req.url,
    query:     query.stringify(req.query)
  };
  params.data.listing = dataProvider.getListing(id);

  if (params.debug === '1') {
    params.queryJSON  = JSON.stringify(req.query);
    params.paramsJSON = JSON.stringify(req.params);
    params.dataJSON   = JSON.stringify(params.data);
  }

  res.render('listing', params);
});

// With id only provided
router.get('/:id?', function(req, res) {
  var id = req.params.id;
  /* var query2 = req.url.match(/\?/) ? req.url.split('?').pop() : '';
      query2 = query2.length ? '?' + query2 : query2; */

  params.title = 'Listing' + (isNaN(id) ? '' : ' #' + id);
  params.debug = req.query.debug;
  params.test  = req.query.test;
  params.url   = {
    protocol:  req.protocol,
    host:      req.host,
    port:      req.port,
    path:      req.path,
    url:       req.url,
    origURL:   req.originalURL,
    route:     req.route || req.url,
    queryJSON: JSON.stringify(req.query),
    query:     query.stringify(req.query)
  };
  params.data.listing = dataProvider.getListing(id);

  if (params.debug === '1') {
    params.queryJSON  = JSON.stringify(req.query);
    params.paramsJSON = JSON.stringify(req.params);
    params.dataJSON   = JSON.stringify(params.data);
  }

  res.render('listing', params);
});

// With neither id nor alias provided, last chance: the query string containing id=...
router.get('/', function(req, res) {
  var id = req.query.id;
  /* var query2 = req.url.match(/\?/) ? req.url.split('?').pop() : '';
      query2 = query2.length ? '?' + query2 : query2; */

  params.title = 'Listing' + (isNaN(id) ? '' : ' #' + id);
  params.debug = req.query.debug;
  params.test  = req.query.test;
  params.url   = {
    protocol:  req.protocol,
    host:      req.host,
    port:      req.port,
    path:      req.path,
    url:       req.url,
    origURL:   req.originalURL,
    route:     req.route || req.url,
    queryJSON: JSON.stringify(req.query),
    query:     query.stringify(req.query)
  };
  params.data.listing = dataProvider.getListing(id);

  if (params.debug === '1') {
    params.queryJSON  = JSON.stringify(req.query);
    params.paramsJSON = JSON.stringify(req.params);
    params.dataJSON   = JSON.stringify(params.data);
  }

  res.render('listing', params);
});

// No match. Send error.
router.get('*', function(req, res) {
  //FIXME - render error page
  res.send('Bad Route');
});

module.exports = router;
