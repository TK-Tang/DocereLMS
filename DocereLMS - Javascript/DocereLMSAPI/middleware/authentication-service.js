const Models = require("../models");
const Passport = require("passport");
const Responses = require("../helpers/response");

// [IMPORTANT] - This code needs to be refactored as roles are going to have their own table in the database.

exports.isAuthenticated = function (req, res, next){
    if(req.isAuthenticated()){ return next(); }
    res.status(200).send(Responses.success("Redirect request as it has no token."));
}

exports.isNotAuthenticated = function (req, res, next){
    if(!req.isAuthenticated()){ return next(); }
    res.status(200).send(Responses.success("Redirect request as it has a token."));
}

exports.isStudent = function(req, res, next){
    if(!req.isAuthenticated()) { res.status(400).send(Responses.fail("Authentication failure: Not authenticated")); }

    model.User.findOne({
        where: { unikey: req.user.unikey }
    }).then(function(user){
        if(!user){ res.status(400).send(Responses.fail("Authentication failure: user not found in database")); }

        if(user.status === "student"){
            return next();
        } else {
            res.status(400).send(Responses.fail("Authentication failure: User not a student role"));
        }
    });
}

exports.isAdmin = function(req, res, next){
    if(!req.isAuthenticated()) { res.status(400).send(Responses.fail("Authentication failure: Not authenticated")); }

    model.User.findOne({
        where: { unikey: req.user.unikey }
    }).then(function(user){
        if(!user){ res.status(400).send(Responses.fail("Authentication failure: admin not found in database")); }

        if(user.status === "admin"){
            return next();
        } else {
            res.status(400).send(Responses.fail("Authentication failure: Request not an admin role"));
        }
    });
}


