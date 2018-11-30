var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/testdb", { useNewUrlParser: true });
mongoose.connection.on("connected", function () {
    console.log("mongoose connection success");
});
mongoose.connection.on("error", function (err) {
    console.log("mongoose connection error:" + err);
});

mongoose.connection.on("disconnected", function () {
    console.log("mongoose connection disconnected.");
});
module.exports = mongoose;