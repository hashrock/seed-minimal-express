var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var router = express.Router();
router.get('/', function(req, res, next) {
  res.json({"message" : "hello, world"});
});
app.use('/api', router);

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    status: "error",
    message: err.message,
    error: err
  })
});

var port = (process.env.PORT || '3000');
app.set('port', port);
var server = http.createServer(app);
server.listen(port);
