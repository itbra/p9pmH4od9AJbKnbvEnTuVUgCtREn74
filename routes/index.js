"use strict";

var express   = require('express'),
    query     = require('querystring'),
    router    = express.Router();

/* GET index page. */
router.get('/', function(req, res) {
  res.render('index', {
    title: 'Home',
    debug: req.query.debug,
    test:  req.query.test,
    pageTestScript: '/qa/tests-index.js',
    url: {
      host:  req.host,
      path:  req.path,
      url:   req.url,
      route: req.route || req.url,
      query: query.stringify(req.query)
    },
    data: {
    }
  });
});

module.exports = router;
