"use strict";

var express = require('express'),
    router = express.Router();

/* GET listing. */
router.get('/', function(req, res, next) {
  //res.send('respond with a resource');
  res.render('listing', {
    title: 'Listing'
  });

  next();
});

module.exports = router;
