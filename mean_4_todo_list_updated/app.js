// mongoose setup
require('./models/schemas');

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
//var configs = require('./configs/configs');

var indexRoutes = require('./routes/index');
var usersRoutes = require('./routes/users');

mongoose.connect('mongodb://localhost/todo_ugrade');
var db = mongoose.connection;
db.on('error', function () {
    console.log('MongoDB connection error. Check configs');
});
// db.once('open', function(err) {
//     if(!err) {
//         console.log('Error in opening database :');
//         console.log(err);
//     } else {
//         console.log('Successfully opened database');
//     }
// });


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// // Making our db accessible to our router
// app.use(function(req, res, next) {
//     req.db = db;
//     next();
// });

app.use('/', indexRoutes);
app.use('/users', usersRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
