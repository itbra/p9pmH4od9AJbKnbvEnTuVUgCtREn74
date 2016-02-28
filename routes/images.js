"use strict";

var express   = require('express'),
    query     = require('querystring'),
    router    = express.Router();

var instagram = require('instagram-node').instagram();

// Order matters!
// Every call to `ig.use()` overrides the `client_id/client_secret`
// or `access_token` previously entered if they exist.
instagram.use({
  client_id:     '​8994e52dac3f4e7c92dc85ae5205bed7',
  client_secret: '​e3435d4ed7994a6eb8a7142ec61f60bf'
});
// We are good to go with only the access token for our purpose (non-editing tasks)
instagram.use({
  access_token:  '1696625649.1677ed0.e7e715293e9b4e09ba82d133b920c280'
});

var render = function(view, data, req, res) {
  view = typeof(view.toLowerCase) === 'function' ? view.toLowerCase() : 'error';
  data = view === 'error' ? {error: data} : {instagram: {media: data, showCaption: 1}};

  res.render(view, {
    title: view.charAt(0).toUpperCase() + view.substr(1),
    debug: req.query.debug,
    test:  req.query.test,
    pageTestScript: '/qa/tests-' + view + '.js',
    url: {
      host:  req.hostname,
      path:  req.path,
      url:   req.url,
      route: req.route || req.url,
      query: query.stringify(req.query)
    },
    data: data
  });
};

/* GET index page. */
router.get('/', function(req, res) {
  if (true) {
  try {
    var data = require('../lib/dataprovider/instagram/cache/media_recent.json');
    render('index', data, req, res);
  } catch (err) {
    render('error', err, req, res);
  }
  }

  if (false) {
  instagram
  .tag_media_recent('lotticarotti', {
	  //max_tag_id: '1088886084593133660'
	  max_tag_id: '1009339832512162313'
  }, function(err, media, pagination, api_requests_left, api_requests_limit) {
    if (err !== null) {
      // render('error', err, req, res);
	  res.send(err);
    } else {
      // render('index', media, req, res);
	  //res.send(media);
	  res.send({pagination: pagination, media: media});
    }
  });
  }
});

module.exports = router;