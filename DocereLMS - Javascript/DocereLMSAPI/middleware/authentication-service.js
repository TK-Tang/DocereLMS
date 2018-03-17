const Models = require("../models");
const Passport = require("passport");
const Responses = require("../helpers/response");

exports.isLoggedIn= function (req, res, next){
    if (req.isAuthenticated()){ return next(); }

    // Someone is not logged in
    Responses.success(res, "Redirect request as it has no token.");
}

exports.isNotLoggedIn = function (req, res, next){
    if (!req.isAuthenticated()){ return next(); }

    // Someone logged in tried to go to sign up page
    Responses.success(res, "Redirect request as it has a token.");
}

exports.isStudent = function(req, res, next){

    var x = req.method;
    var y = req.user;

    if (!req.isAuthenticated()){
        switch(req.path){
            case "/auth/signin":
            case "/auth/signup":
            case "/auth/signout":
                return next();
                break;
        }

        if (req.path.substring(0,13) === "/auth/signup/"){
            return next();
        }
    } else {
        switch(req.path){
            case "/auth/signout":
                return next();
                break;
        }
    }

    if (req.user == null){ return Responses.fail(res, "Authentication failure: Not authenticated"); }
    if (!req.isAuthenticated()) { return Responses.fail(res, "Authentication failure: Not authenticated"); }
    
    Models.Users.getUser(null, req.user.email, Models).then(function(user){
        if (!user){ 
            console.log("Email not found in database for user logging in");
            return Responses.fail(res, "Authentication failure");
        }

        if(!user.Role){
            console.log("User role not found in database for using logging in");
            return Responses.fail(res, "Authentication failure");
        } else if (user.Role.rank != "student"){
            console.log("User is not a student. They have a rank of: " + user.Role.rank);
            return Responses.fail(res, "Authentication failure");
        }

        return next();
    });
}

exports.isAdmin = function(req, res, next){
    
    if (!req.isAuthenticated()){
        switch(req.path){
            case "/auth/signin":
            case "/auth/signup":
            case "/auth/signout":
                return next();
                break;
        }
    } else {

    }

    Models.Users.getUser(null, req.user.email, Models).then(function(user){
        if (!user){ 
            console.log("Email not found in database for user logging in");
            Responses.fail(res, "Authentication failure");
        }

        if(!user.Role){
            console.log("User role not found in database for using logging in");
            Responses.fail(res, "Authentication failure");
        } else if (user.Role.rank != "admin"){
            console.log("User is not an admin. They have a rank of: " + user.Role.rank);
            Responses.fail(res, "Authentication failure");
        }

        return next();
    });
}
