const courseScript = require("./course-startscript.js");
const roleScript = require("./role-startscript.js");
const userScript = require("./user-startScript.js");

const Models = require("../models");
const bCrypt = require("bcrypt-nodejs");

module.exports.startScript = function (){
    var userList = userScript.startScript();
    var roleList = roleScript.startScript();
    var courseList = courseScript.startScript();

    for (var key in courseList){
        var course = courseList[key];
        Models.Courses.create(course);
    };

    for (var key in userList){
        var user = userList[key];
        Models.Users.create(user);     
    };

    for (var key in roleList){
        var role = roleList[key]
        Models.Roles.create(role);
    };
};
