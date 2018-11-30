﻿var mongoose = require("./mongodb.js");
var Schema = mongoose.Schema;
var UserSchema = new Schema({
    username: { type: String },
    userpwd: { type: String },
    userage: {type:Number}
});
module.exports = mongoose.model("User", UserSchema);