const Models = require("../models");
const Passport = require("passport");
const Responses = require("../helpers/response");

exports.isLoggedIn = function (req, res, next){
    if (req.isAuthenticated()){ return next(); }
    return Responses.fail(res, "User not logged in");
}

exports.isNotLoggedIn = function (req, res, next){
    if (!req.isAuthenticated()){ return next(); }
    return Responses.fail(res, "User already logged in");
}

exports.isPublicPage = function (req, res, next){
    switch(req.path){
        case "/auth/signin":
        case "/auth/signup":
        case "/auth/signout":
            return next();
            break;
    }

    switch(req.path.substring(0, 12)){
        case "/auth/signup":
            return next();
            break;
    }

    if (req.isAuthenticated()){ return next(); }
    Responses.fail(res, "Authentication failure: Not authenticated for non-public data");
}

// For updating profiles
exports.isCurrentUser = function(req, res, next){
    const user_id = req.params.user_id;
    
    Models.Users.getUserIncludingPassword(user_id, user_id, Models).then(function(user){
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

exports.isPostOwner = function(req, res, next){
    const post_id = parseInt(req.params.post_id, 10);
    var course_id = parseInt(req.params.course_id, 10);
    if (isNaN(post_id)){ Responses.error(res, "Error authenticating. Post ID is not a number", null); }
    if (isNaN(course_id)){ Response.error(res, "Error authenticating. Course id is not a number", null); }

    Promise.all([Models.Post.getPost(post_id), Models.Users.getUserIncludingCourse(null, req.user.email, course_id, Models)]).then(([post, user]) => {
        if(!post || post.user_id != req.user.id || user.Courses[0].Roles.rank !== "admin"){
            return Responses.fail(res, "This is not your post. You do not have permission to do this.", null)
        } else {
            return next();
        }
    });
}

exports.isTopicOwner = function(req, res, next){
    const topic_id = parseInt(req.params.topic_id, 10);
    var course_id = parseInt(req.params.course_id, 10);
    if (isNaN(topic_id)){ Responses.error(res, "Error authenticating. Topic ID is not a number", null); }
    if (isNaN(course_id)){ Response.error(res, "Error authenticating. Course id is not a number", null); }

    Promise.all([Models.Topic.getPost(topic_id), Models.Users.getUserIncludingCourse(null, req.user.email, course_id, Models)]).then(([topic, user]) => {
        if(!topic || topic.user_id != req.user.id || user.Courses[0].Roles.rank !== "admin"){
            return Responses.fail(res, "This is not your topic. You do not have permission to do this.", null)
        } else {
            return next();
        }
    });
}

exports.isStudentOrAdminForCourse = function(req, res, next){
    var course_id = parseInt(req.params.course_id, 10);
    if (isNaN(course_id)){ Response.error(res, "Error authenticating. Course id is not a number", null); }
    
    Models.Users.getUserIncludingCourse(null, req.user.email, course_id, Models).then(function(user){
        if(user.Courses.length === 0){ return Responses.fail(res, "You are not registered to this course", null); }
        if (user.Courses[0].Roles.rank === "student" || user.Courses[0].Roles.rank === "admin"){
            return next();
        } else {
            return Responses.fail(res, "You do not have permission to do this.", null);
        }
    }).catch( e => {
        console.log(e);
        return Responses.error(res, "Error verifying your request", e);
    });
}

exports.isAdminForCourse = function(req, res, next){
    const course_id = parseInt(req.params.course_id, 10);

    Models.Users.getUserIncludingCourse(null, req.user.email, course_id, Models).then(function(user){
        if (user.Courses.length !== 0 && user.Courses[0].Roles.rank === "admin"){
            return next();
        } else {
            Responses.fail(res, "You do not have permission to do this.", null);
        }
    }).catch( e => {
        console.log(e);
        return Responses.error(res, "Error verifying your request", e);
    });
}
