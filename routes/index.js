"use strict";

var express = require('express'),
    query   = require('querystring'),
    router  = express.Router();

/* GET index page. */
router.get('/', function(req, res) {
  /* var query2 = req.url.match(/\?/) ? req.url.split('?').pop() : '';
      query2 = query2.length ? '?' + query2 : query2; */

  res.render('index', {
    title: 'Home',
    debug: req.query.debug,
    test: req.query.test,
    pageTestScript: '/qa/tests-index.js',
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
    }
  });
});

module.exports = router;
