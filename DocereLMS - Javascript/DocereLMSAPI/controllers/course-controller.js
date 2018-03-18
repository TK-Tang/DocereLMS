const Responses = require("../helpers/response");
const Models = require("../models");

exports.getCourse = function(req, res){
    const course_id = parseInt(req.params.course_id, 10);
    if (isNaN(course_id)){ Responses.error(res, "Input Id is not a number", null); }

    Models.Courses.getCourse(course_id, Models).then(function(courses){
        if (!courses){
            Responses.fail(res, "Course not found", null);
        } else {
            Responses.success(res, "Courses found", courses);
        }
    });
};

exports.getCourseIncludingUser = function(req, res){
    var email = req.params.term;
    var user_id = parseInt(req.params.term);
    const course_id = parseInt(req.params.course_id)

    Models.Courses.getCourseIncludeUser(course_id, user_id, email, Models).then(function(course){
        
    });
};

exports.getCourseIncludingUsers = function(req, res){
    const course_id = parseInt(req.params.course_id, 10);
    if (isNaN(course_id)){ Responses.error(res, "Input Id is not a number", null); }

    Models.Courses.getCourseIncludingUsers(course_id, Models).then(function(courses){
        if (!courses){
            Responses.fail(res, "Course not found", null);
        } else {
            Responses.success(res, "Courses found", courses);
        }
    });
};

exports.getCourseIncludingStudents = function(req, res){
    const course_id = parseInt(req.params.course_id, 10);
    if (isNaN(course_id)){ Responses.error(res, "Input Id is not a number", null); }

    Models.Courses.getCourseIncludingUsersAndRank (course_id, "student", Models).then(function(courses){
        if (!courses){
            Responses.fail(res, "Course not found", null);
        } else {
            Responses.success(res, "Courses found", courses);
        }
    });
};

exports.getCourseIncludingAdmins = function(req, res){
    const course_id = parseInt(req.params.course_id, 10);
    if (isNaN(course_id)){ Responses.fail(res, "Input Id is not a number", null); }

    Models.Courses.getCourseIncludingUsersAndRank(course_id, "admin", Models).then(function(courses){
        if (!courses){
            Responses.fail(res, "Course not found", null);
        } else {
            Responses.success(res, "Courses found", courses);
        }
    });
};
    
