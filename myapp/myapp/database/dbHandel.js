var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var UserSchema = new Schema({
    uname: { type: String },
    upwd: {type:String}
});
mongoose.model("User", UserSchema);


module.exports = {
    getModel: function (type) {
        return mongoose.model(type);
    },
    insertUser: function (name, pwd) {
        console.log("dbhandel insertUser start. name:" + name + " pwd:" + pwd);
        var User = global.dbHandel.getModel("User");
        User.create({
            uname: name,
            upwd: pwd
        }, function (err, doc) {
            if (err) {
                console.log("insertUser err:" + err);
            }
            else {
                console.log("insertUser success");
            }
            });
    }
};

