'use strict';
var express = require("express");
var router = express.Router();

router.get("/", function (req, res) { 
    if (req.session.users != null)
        req.session.users = null;
    res.redirect("/");
});

module.exports = router; 