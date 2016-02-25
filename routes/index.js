"use strict";

var express = require('express'),
    router  = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  //res.send('respond with a resource');
  res.render('index', {
    title: 'Home',
    url: req.url,
    query: req.query,
    queryJSON: JSON.stringify(req.query),
    test: req.query.test,
    pageTestScript: '/qa/tests-index.js'
  });
});

module.exports = router;
