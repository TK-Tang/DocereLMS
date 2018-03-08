const Models = require("../models");

module.exports.startScript = function (){
    var userList = {};

    userList.user001 = {
        email: "tk.tang@live.com.au",
        username: "TK",
        password: "24157817",
        status: "offline",
        activation: "active"
    };

    for (var key in userList){
        var user = userList[key]
        Models.Users.create(user);
    };
};