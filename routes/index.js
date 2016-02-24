"use strict";

var express = require('express'),
    router  = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.send('respond with a resource');
  res.render('index', {
    title: 'Home',
    test: req.query.test || '-1'
  });

  next();
});

module.exports = router;
