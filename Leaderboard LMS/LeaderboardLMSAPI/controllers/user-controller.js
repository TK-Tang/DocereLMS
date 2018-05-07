const Responses = require("../helpers/response");
const Models = require("../models");

exports.getUser = function(req, res){
    const email = req.params.term;
    var user_id = parseInt(req.params.term, 10);
    user_id = isNaN(user_id) ? null : user_id;

    Models.Users.getUser(user_id, email, Models).then(function(user){
        if (!user){
            Responses.fail(res, "No user found", null);
        } else {
            Responses.success(res, "User found", user);
        }
    });
};

exports.getUserIncludingCourse = function(req, res){
    const email = req.params.term;
    var user_id = parseInt(req.params.term, 10);
    var course_id = parseInt(req.params.course_id, 10);
    course_id = isNaN(course_id) ? null : course_id;
    user_id = isNaN(user_id) ? null : user_id;


    Models.Users.getUserIncludingCourse(user_id, email, course_id, Models).then(function(user){
        if (!user){
            Responses.fail(res, "No user found", null);
        } else {
            Responses.success(res, "No user found", user);
        }
    });
};

exports.getUserIncludingCourses = function(req, res){
    const email = req.params.term;
    var user_id = parseInt(req.params.term, 10);
    user_id = isNaN(user_id) ? null : user_id;

    Models.Users.getUserIncludingCourses(user_id, email, Models).then(function(user){
        if (!user){
            Responses.fail(res, "No user found", null);
        } else {
            Responses.success(res, "User found", user);
        }
    });
};

exports.getUserIncludingCourseAndRole = function(req, res){
    const user_id = parseInt(req.params.user_id, 10);
    var course_id = req.params.course_id;

    Models.Users.getUserIncludingCourseAndRole(user_id, course_id, Models).then(function(user){
        if (!user){
            Responses.fail(res, "User not found", null);
        } else {
            Responses.success(res, "User found", null);
        }
    })
}

exports.updateUser = function(req, res){
    const user_id = parseInt(req.params.user_id, 10);
    const email = req.body.email;
    const username = req.body.username;
    const profilePictureLink = req.body.profilePictureLink;

    if (!email){
        Responses.fail(res, "Email cannot be empty", null);
    } else if (!username){
        Responses.fail(res, "Username cannot be empty", null);
    }

    Models.Users.updateUser(user_id, email, username, profilePictureLink).then(function(user){
        if (!user){
            Responses.fail(res, "Error updating user", null);
        } else {
            Responses.success(res, "User updated successfully", user);
        }
    });
};