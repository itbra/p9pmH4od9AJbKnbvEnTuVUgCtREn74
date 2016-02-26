var logger       = require('morgan');
var path         = require('path');
var express      = require('express');
var favicon      = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');

var app = express();
app.use(express.static(path.join(__dirname, 'public')));
/* app.use(function(req, res) {
  res.locals.test = app.get('env') !== 'production' && req.query.test === '1';
}); */

// view engine setup
var exphbs       = require('express-secure-handlebars');
app.engine('hbs', exphbs({defaultLayout: 'main', extname: '.hbs'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// logger setup
app.use(logger('dev'));

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// parser setup
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// routes setup
app.use('/',         require('./routes/index'));
app.use('/listing',  require('./routes/listing'));
app.use('/listings', require('./routes/listings'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  "use strict";

  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    "use strict";

    res.status(err.status || 500);
    /* res.render('error', {
      message: err.message,
      error: err
    }); */

    // by me: send error to keep us away from blank pages
    res.send(err.message);
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  "use strict";

  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
