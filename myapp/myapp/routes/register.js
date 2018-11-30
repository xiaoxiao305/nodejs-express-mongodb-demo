'use strict';
var express = require('express');
var router = express.Router();


router.get('/', function (req, res) {
    res.render('register', { title: 'register page' });
}).post('/', function (req, res) {
    var name = req.body.uname;
    var pwd = req.body.upwd; 
    var User = global.dbHandel.getModel("User"); 
    User.findOne({ uname: name }, function (err, doc) {
        if (err) {
            console.log(err);
            res.send(500);
        }
        else if (doc) {
            console.log("register err.name is exist:" + name);
            res.send(500);
        }
        else {
            global.dbHandel.insertUser(name, pwd);
            res.send(200);
        }
    });



});

module.exports = router;
