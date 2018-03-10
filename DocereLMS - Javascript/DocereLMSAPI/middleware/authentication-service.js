const Models = require("../models");
const Passport = require("passport");
const Responses = require("../helpers/response");

exports.isAuthenticated = function (req, res, next){
    if (req.isAuthenticated()){ return next(); }
    res.status(200).send(Responses.success("Redirect request as it has no token."));
}

exports.isNotAuthenticated = function (req, res, next){
    if (!req.isAuthenticated()){ return next(); }
    res.status(200).send(Responses.success("Redirect request as it has a token."));
}

exports.isStudent = function(req, res, next){
    if (!req.isAuthenticated()){
        switch(req.path){
            case "/auth/signin":
            case "/auth/signup":
            case "/auth/signout":
                return next();
                break;
    
            if (req.path.substring(0,6) === "/invite"){
                return next();
            }
        }
    }

    if (!req.isAuthenticated()) { res.status(400).send(Responses.fail("Authentication failure: Not authenticated")); }

    Models.Users.get(req.body.email, Models).then(function(user){
        if (!user){ 
            console.log("Email not found in database for user logging in");
            return res.status(400).send(Responses.fail("Authentication failure"));
        }

        if(!user.Roles){
            console.log("User role not found in database for using logging in");
            return res.status(400).send(Responses.fail("Authentication failure"));
        } else if (user.Roles.rank != "student"){
            console.log("User is not a student. They have a rank of: " + user.Roles.rank);
            return res.status(400).send(Responses.fail("Authentication failure"));
        }

        return next();
    });
}


