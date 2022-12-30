var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var flash = require('connect-flash');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var search = require('./routes/search');

var app = express();

var sampledataRouter = require('./routes/show_alumni');
var sampledataRouter2 = require('./routes/show_college');
var sampledataRouter3 = require('./routes/show_course');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/index', indexRouter);
app.use('/search',search);


app.use('/show_alumni', sampledataRouter);
app.use('/show_college', sampledataRouter2);
app.use('/show_course', sampledataRouter3);

app.use(session({
  secret:'webslesson',
  cookie: {maxAge : 60000},
  saveUninitialized: false,
  resave: false
}));

app.use(flash());







// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
