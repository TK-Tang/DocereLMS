const Models = require("../models");
const Passport = require("passport");
const Responses = require("../helpers/response");

exports.isAuthenticated = function (req, res, next){
    if(req.isAuthenticated()){ return next(); }
    res.status(200).send(Responses.success("Redirect request as it has no token."));
}

exports.isNotAuthenticated = function (req, res, next){
    if(!req.isAuthenticated()){ return next(); }
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

    if(!req.isAuthenticated()) { res.status(400).send(Responses.fail("Authentication failure: Not authenticated")); }

    Models.Users.get(req.body.email).then(function(user){
        if(!user){ 
            console.log("Email not found in database for user logging in");
            res.status(400).send(Responses.fail("Authentication failure"));
         }

        Models.Roles.get(user.user_id).then(function(role){
            if(!role){  
                console.log("Role not found in database for user logging in");
                res.status(400).send(Responses.fail("Authentication failure"));
            }

            if(!role.rank == "student"){
                res.status(400).send(Responses.fail("Authentication failure"));
            }

            return next();
        })
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
    
            if (req.path.substring(0,6) === "/invite"){
                return next();
            }
        }
    }

    if(!req.isAuthenticated()) { res.status(400).send(Responses.fail("Authentication failure: Not authenticated")); }

    Models.Users.get(req.body.email).then(function(user){
        if(!user){ 
            console.log("Email not found in database for user logging in");
            res.status(400).send(Responses.fail("Authentication failure"));
         }

        Models.Roles.get(user.user_id).then(function(role){
            if(!role){  
                console.log("Role not found in database for user logging in");
                res.status(400).send(Responses.fail("Authentication failure"));
            }

            if(!role.rank == "admin"){
                res.status(400).send(Responses.fail("Authentication failure"));
            }

            return next();
        })
    });
}


