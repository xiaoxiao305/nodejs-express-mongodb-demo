'use strict';
var express = require("express");
var router = express.Router();
router.get("/", function (req, res) { 
    var doc = req.session.users;
    if (doc) { 
        res.render("home", { uname: doc.uname });
    } else
        res.redirect("/login");
});
module.exports = router;;