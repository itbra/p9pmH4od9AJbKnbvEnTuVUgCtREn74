"use strict";

var express = require('express'),
    router = express.Router();

/* GET listings. */
router.get('/', function(req, res, next) {
  //res.send('respond with a resource');
  res.render('listings', {
    title: 'Listings',
    test: req.query.test || '-1'
  });

  next();
});

module.exports = router;
