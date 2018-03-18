const Models = require("../models");
const Passport = require("passport");
const Responses = require("../helpers/response");

exports.isLoggedIn= function (req, res, next){
    if (req.isAuthenticated()){ return next(); }
    return Responses.success(res, "Redirect request as it has no token.");
}

exports.isNotLoggedIn = function (req, res, next){
    if (!req.isAuthenticated()){ return next(); }
    return Responses.success(res, "Redirect request as it has a token.");
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

    if (req.isAuthenticated()){ return next(); }
    Responses.fail(res, "Authentication failure: Not authenticated");
}

exports.IsCurrentUser = function(req, res, next){
    const term = req.params.term;
    
    Models.Users.getUser(term, term, Models).then(function(user){
        if (user.email == req.user.email){
            return next();
        } else {
            return Responses.fail(res, "You do not have permission to do this.", null);
        }
    }).catch( e => {
        console.log(e);
        return Responses.error(res, "Error updating profile", e);
    });
}

exports.isStudentOrAdminForCourse = function(req, res, next){
    var course_id = parseInt(req.params.course_id, 10);
    
    Models.Users.getUserIncludingCourse(null, req.user.email, course_id, Models).then(function(user){
        if (user.Courses[0].Roles.rank === "student" || user.Courses[0].Roles.rank === "admin"){
            return next();
        } else {
            return Responses.fail(res, "You do not have permission to do this.");
        }
    }).catch( e => {
        console.log(e);
        return Responses.error(res, "Error verifying your request", e);
    });
}

exports.isAdminForCourse = function(req, res, next){
    const course_id = parseInt(req.params.course_id, 10);

    Models.Users.getUserIncludingCourse(null, req.user.email, course_id, Models).then(function(user){
        if (user.Courses[0].Roles.rank === "admin"){
            return next();
        } else {
            Responses.fail(res, "You do not have permission to do this.", null);
        }
    }).catch( e => {
        console.log(e);
        return Responses.error(res, "Error verifying your request", e);
    });
}
