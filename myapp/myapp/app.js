'use strict';
var debug = require('debug');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require("mongoose");

var routes = require('./routes/index');
var users = require('./routes/users');
var register = require('./routes/register');
var login = require("./routes/login");
var home = require("./routes/home"); 
var session = require("express-session");
var logout = require("./routes/logout"); 



global.dbHandel = require("./database/dbHandel");
global.db = mongoose.connect("mongodb://localhost/mynodedb", { useNewUrlParser: true });


var app = express();
app.use(session({
    secret: 'keyboard catadsfadf',
    resave: true,
    saveUninitialized: true
}))






//view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine("html", require("ejs").__express);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(function (req, res, next) {
    res.locals.user = req.session.user;
    var err = req.session.error;
    delete req.session.error;
    res.locals.message = "";
    if (err) {
        // res.locals.message = '<div class="alert alert-danger" style="margin-bottom:20px;color:red;">' + err + '</div>';
        console.log("app.use session err." + err);
    }
    next();
});





app.use('/', routes);
app.use('/users', users);
app.use("/register", register);
app.use("/login", login);
app.use("/home", home);
app.use("/logout", logout);




// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}
// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function () {
    debug('Express server listening on port ' + server.address().port);
});


module.exports = app;