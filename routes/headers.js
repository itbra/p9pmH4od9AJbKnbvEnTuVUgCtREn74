"use strict";

var express   = require('express'),
    query     = require('querystring'),
    router    = express.Router();

/* GET index page. */
router.get('/', function (req, res) {
  res.set('Content-Type', 'text/plain');

  var s = '';

  for (var name in req.headers) {
    s += name + ': ' + req.headers[name] + "\n";
  }

  res.end(s);
});

module.exports = router;
