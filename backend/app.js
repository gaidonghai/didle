'use strict';

//Start from express
var express = require('express');
var app = express();

//LeanCloud
var AV = require('leanengine');
app.use(AV.express());
app.enable('trust proxy');

//Cors
var cors = require('cors')
app.use(cors())

//Gzip
var compression = require('compression')
app.use(compression())

//Timeout
var timeout = require('connect-timeout');
app.use(timeout('15s'));

//Parsers
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var cookieParser = require('cookie-parser');
app.use(cookieParser());

// ------------ 应用功能代码开始 ------------

// 前端代码
app.use(express.static('frontend_build'));

// API接口
app.use('/api/echo', require('./routes/echo'));
app.use('/api/city', require('./routes/cityRoutes'));


// ------------ 应用功能代码结束 ------------


app.use(function(req, res, next) {
  // 如果任何一个路由都没有返回响应，则抛出一个 404 异常给后续的异常处理器
  if (!res.headersSent) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  }
});

// error handlers
app.use(function(err, req, res, next) {
  if (req.timedout && req.headers.upgrade === 'websocket') {
    // 忽略 websocket 的超时
    return;
  }

  var statusCode = err.status || 500;
  if (statusCode === 500) {
    console.error(err.stack || err);
  }
  if (req.timedout) {
    console.error('请求超时: url=%s, timeout=%d, 请确认方法执行耗时很长，或没有正确的 response 回调。', req.originalUrl, err.timeout);
  }
  res.status(statusCode);
  // 默认不输出异常详情
  var error = {};
  if (app.get('env') === 'development') {
    // 如果是开发环境，则将异常堆栈输出到页面，方便开发调试
    error = err;
  }
  res.render('error', {
    message: err.message,
    error: error
  });
});

module.exports = app;