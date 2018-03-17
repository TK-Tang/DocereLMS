const Models = require("../models");
const Passport = require("passport");
const Responses = require("../helpers/response");

exports.isLoggedIn= function (req, res, next){
    if (req.isAuthenticated()){ return next(); }
    Responses.success(res, "Redirect request as it has no token.");
}

exports.isNotLoggedIn = function (req, res, next){
    if (!req.isAuthenticated()){ return next(); }
    Responses.success(res, "Redirect request as it has a token.");
}

exports.isPublicPage = function (req, res, next){
    switch(req.path){
        case "/auth/signin":
        case "/auth/signup":
        case "/auth/signout":
            return next();
            break;
    }

    switch(req.path.substring(0, 13)){
        case "/auth/signup/":
            return next();
            break;
    }

    if (req.isAuthenticated()){
        return next();
    }

    Responses.fail(res, "Authentication failure: Not authenticated");
}

exports.isStudentOrAdminForCourse = function(req, res, next){
    var course_id = parseInt(req.params.course_id, 10);
    
    Models.Users.getUserIncludingCourse(null, req.user.email, course_id, Models).then(function(user){
        if (!user){ 
            console.log("Email not found in database for user logging in");
            Responses.fail(res, "Authentication failure");
        }

        if(!user.Role){
            console.log("User role not found in database for using logging in");
            Responses.fail(res, "Authentication failure");
        } else if (user.Role.rank != "student" || user.Role.rank != "admin"){
            console.log("User is not a student. They have a rank of: " + user.Role.rank);
            Responses.fail(res, "Authentication failure");
        }

        return next();
    });
}

exports.IsCurrentUser = function(req, res, next){
    const term = req.params.term;
    
    Models.Users.getUser(term, term, Models).then(function(user){
        if (user.email == req.user.email){
            return done();
        } else {
            Response.fail("You do not have permission to do this.");
        }
    });
}

exports.isAdminForCourse = function(req, res, next){
    const course_id = parseInt(req.params.course_id, 10);

    Models.Users.getUserIncludingCourse(null, req.user.email, course_id, Models).then(function(user){
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
