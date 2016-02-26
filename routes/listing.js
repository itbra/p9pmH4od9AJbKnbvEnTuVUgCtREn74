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



/* GET Edit-Form. */

// With id and alias provided
router.get('/edit/:id?/:alias?', function(req, res) {
  var id = req.params.id,
      listing = dataProvider.getListing(id);

  res.render('listing', {
    title: 'Edit: ' + (listing.title ? listing.title : ''),
    debug: req.query.debug,
    test:  req.query.test,
    pageTestScript: '/qa/tests-listing-form-edit.js',
    url: {
      path:    req.path,
      url:     req.url,
      route:   req.route || req.url,
      query:   query.stringify(req.query),
      referer: req.header('Referer') || req.url
    },
    showForm: true,
    form: {
      name: 'edit',
      data: listing
    }
  });
});

// With id only provided
router.get('/edit/:id?', function(req, res) {
  var id = req.params.id,
      listing = dataProvider.getListing(id);

  res.render('listing', {
    title: 'Edit: ' + (listing.title ? listing.title : ''),
    debug: req.query.debug,
    test:  req.query.test,
    pageTestScript: '/qa/tests-listing-form-edit.js',
    url: {
      path:    req.path,
      url:     req.url,
      route:   req.route || req.url,
      query:   query.stringify(req.query),
      referer: req.header('Referer') || req.url
    },
    showForm: true,
    form: {
      name: 'edit',
      data: listing
    }
  });
});

router.get('/edit/*', function(req, res) {
  //FIXME - render error page
  res.send('Bad Route');
});



/* GET ADD-Form */

router.get('/add', function(req, res) {
  res.render('listing', {
    title: 'Add Listing',
    debug: req.query.debug,
    test:  req.query.test,
    pageTestScript: '/qa/tests-listing-form-add.js',
    url: {
      path:    req.path,
      url:     req.url,
      route:   req.route || req.url,
      query:   query.stringify(req.query),
      referer: req.header('Referer') || req.url
    },
    showForm: true,
    form: {
      name: 'add',
      data: {}
    }
  });
});



/* GET listing details. */

// With id and alias provided
router.get('/:id?/:alias?', function(req, res) {
  var id = req.params.id,
      listing = dataProvider.getListing(id);

  params.title = 'Listing' + (isNaN(id) ? '' : ' #' + id);
  params.debug = req.query.debug;
  params.test  = req.query.test;
  params.url   = {
    path:    req.path,
    url:     req.url,
    route:   req.route || req.url,
    query:   query.stringify(req.query),
    referer: req.header('Referer') || req.url
  };
  params.data.listing = listing;
  params.showForm = false;

  if (params.debug === '1') {
    params.queryJSON  = JSON.stringify(req.query);
    params.paramsJSON = JSON.stringify(req.params);
    params.dataJSON   = JSON.stringify(params.data);
  }

  res.render('listing', params);
});

// With id only provided
router.get('/:id?', function(req, res) {
  var id = req.params.id,
      listing = dataProvider.getListing(id);

  params.title = 'Listing' + (isNaN(id) ? '' : ' #' + id);
  params.debug = req.query.debug;
  params.test  = req.query.test;
  params.url   = {
    path:    req.path,
    url:     req.url,
    route:   req.route || req.url,
    query:   query.stringify(req.query),
    referer: req.header('Referer') || req.url
  };
  params.data.listing = listing;
  params.showForm = false;

  if (params.debug === '1') {
    params.queryJSON  = JSON.stringify(req.query);
    params.paramsJSON = JSON.stringify(req.params);
    params.dataJSON   = JSON.stringify(params.data);
  }

  res.render('listing', params);
});

// With neither id nor alias provided, last chance: the query string containing id=...
router.get('/', function(req, res) {
  var id = req.query.id,
      listing = dataProvider.getListing(id);

  params.title = 'Listing' + (isNaN(id) ? '' : ' #' + id);
  params.debug = req.query.debug;
  params.test  = req.query.test;
  params.url   = {
    path:    req.path,
    url:     req.url,
    route:   req.route || req.url,
    query:   query.stringify(req.query),
    referer: req.header('Referer') || req.url
  };
  params.data.listing = listing;
  params.showForm = false;

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
