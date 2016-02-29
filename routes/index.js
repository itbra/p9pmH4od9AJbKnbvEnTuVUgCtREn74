"use strict";

var express   = require('express'),
    query     = require('querystring'),
    router    = express.Router();

/* GET index page. */
router.get('/', function(req, res) {
  var params = {
    title: 'Home',
	body: 'partials/pages/home.ejs',
    debug: req.query.debug,
    test:  req.query.test,
    pageTestScript: '/qa/tests-index.js',
	allowTestDebug: express().get('env') === 'development',
    url: {
      host:  req.host,
      path:  req.path,
      url:   req.url,
      route: req.route || req.url,
      query: query.stringify(req.query)
    },
    data: {
    }
  };

  res.render('index', params);
});

module.exports = router;
