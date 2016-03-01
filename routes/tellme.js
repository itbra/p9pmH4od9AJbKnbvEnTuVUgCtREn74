"use strict";

var express   = require('express'),
    query     = require('querystring'),
    router    = express.Router();

/* GET device infos page. */
router.get('/device', function (req, res, next) {
  res.set('Content-Type', 'text/plain');

  var s = '';

  s += 'type: ' + req.device.type + "\n";
  s += 'name: ' + req.device.name;

  res.end(s);
});

router.get('/device/full', function (req, res, next) {
  res.set('Content-Type', 'text/plain');
  res.end(JSON.stringify(req.device));
});

/* GET headers page. */
router.get('/headers', function (req, res, next) {
  res.set('Content-Type', 'text/plain');

  var s = '';

  for (var name in req.headers) {
    s += name + ': ' + req.headers[name] + "\n";
  }

  res.end(s);
});

module.exports = router;
