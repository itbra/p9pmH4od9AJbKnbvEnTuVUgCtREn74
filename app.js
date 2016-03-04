var logger       = require('morgan');
var path         = require('path');
var express      = require('express');
var device       = require('express-device');
var favicon      = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');

var app = express();
app.use(express.static(path.join(__dirname, 'public')));

// view engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// view globals

app.locals.site = 'Lotti the Havanese';

// logger setup

if (app.get('env') === 'development') {
  app.use(logger('dev'));
} else {
  var fs         = require('fs'),
      logFolder  = __dirname + '/logs',
      logFile    = logFolder + '/access-%DATE%.log',
      logRotator = require('file-stream-rotator');

  // ensure log directory exists
  fs.existsSync(logFolder) || fs.mkdirSync(logFolder);

  // create a rotating write stream
  var logWriter  = logRotator.getStream({
    date_format: 'YYYYMMDD',
    filename: logFile,
    frequency: 'daily',
    verbose: false
  });

  app.use(logger('combined', {stream: logWriter}));
}

// device detection setup

app.use(device.capture());

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// parser setup

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// routes setup

// app.use('/',       require('./routes/index'));
app.use('/',          require('./routes/images'));
// app.use('/images', require('./routes/images'));
app.use('/tellme' ,   require('./routes/tellme'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  "use strict";

  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    "use strict";

    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });

    // by me: send error to keep us away from blank pages
    // res.end(err.message);
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  "use strict";

  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });

  // by me: send error to keep us away from blank pages
  // res.end(err.message);
});

module.exports = app;
