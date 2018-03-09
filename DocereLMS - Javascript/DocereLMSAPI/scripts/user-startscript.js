const Models = require("../models");
const bCrypt = require("bcrypt-nodejs");

module.exports.userScript = function (){
    var userList = {};

    userList.user001 = {
        email: "tk@gmail.com",
        username: "TKTang",
        password: generateHash("24157817"),
        status: "offline",
        activation: "active"
    };

    userList.user002 = {
        email: "kitty@gmail.com",
        username: "Kitty",
        password: generateHash("24157817"),
        status: "offline",
        activation: "active"
    }

    userList.user003 = {
        email: "simon@gmail.com",
        username: "Simon",
        password: generateHash("24157817"),
        status: "offline",
        activation: "active"
    }

    for (var key in userList){
        var user = userList[key];
        Models.Users.create(user);
    };
};

function generateHash(password){
    return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
};