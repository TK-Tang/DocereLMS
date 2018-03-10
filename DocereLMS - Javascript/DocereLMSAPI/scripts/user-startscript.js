const Models = require("../models");
const bCrypt = require("bcrypt-nodejs");

module.exports.startScript = function (){
    var userList = {};

    userList.user001 = {
        email: "yuan@gmail.com",
        username: "Dong",
        password: generateHash("24157817"),
        status: "offline",
        activation: "active"
    };

    userList.user002 = {
        email: "tk@gmail.com",
        username: "TKTang",
        password: generateHash("24157817"),
        status: "offline",
        activation: "active"
    };

    userList.user003 = {
        email: "kitty@gmail.com",
        username: "Kitty",
        password: generateHash("24157817"),
        status: "offline",
        activation: "active"
    }

    userList.user004 = {
        email: "simon@gmail.com",
        username: "Simon",
        password: generateHash("24157817"),
        status: "offline",
        activation: "active"
    }

    return userList;
};

function generateHash(password){
    return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
};