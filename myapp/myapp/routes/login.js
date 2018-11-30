'use strict';  
var express = require("express");
var router = express.Router();
 
router.get("/", function (req, res) {
    res.render("login", { title: 'login page' });
}).post("/", function (req, res) { 
    var name = req.body.uname;
    var pwd = req.body.upwd;
    var User = global.dbHandel.getModel("User");
    User.findOne({ uname: name }, function (err,doc) {
        if (err) {
            console.log("login err:" + err);
            res.send(500);
        }
        else if (!doc) {
            console.log("name[" + name + "] is not exist.");
            res.send(500);
        }
        else {
            if (pwd != doc.upwd) {
                console.log("login pwd is err.name:" + name + ",pwd:" + pwd);
                res.send(500);
            }
            else { 
                req.session.users = doc; 
                res.send(200);
                res.end();
            }
        }
    });
    });

module.exports = router; 