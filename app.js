/**
 * Created by Lukas on 17-07-2016.
 */
var express = require('express');
var app = express();
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

// Setup logging
app.use(logger('dev'));

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Load the main routes
var routes = require('./routes/index');
var slides = require('./routes/slides');
var notes = require('./routes/notes');

// Set the routes
app.use('/', routes);
app.use('/slides', slides);
app.use('/notes', notes);

// Expose files in 'public' folder to the public on the path /static
app.use('/static', express.static(path.join(__dirname, 'public')));

// uncomment after placing your favicon in /public
// Serves the favicon
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// Accept request bodies formatted as JSON
app.use(bodyParser.json());
// Accept request bodies that are urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// Parse the Cookie header, and populate req.cookies
app.use(cookieParser());

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

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
});

module.exports = app;
