const Responses = require("../helpers/response");
const Models = require("../models");
const AuthService = require("../middleware/authentication-service");

module.exports = function(app){
    app.get("/course/:course_id", AuthService.isStudentOrAdminForCourse, (req, res) => {
        const course_id = parseInt(req.params.course_id, 10);
        if (isNaN(course_id)){ Responses.error(res, "Input Id is not a number", null); }

        Models.Courses.getCourse(course_id, Models).then(function(courses){
            if (!courses){
                Responses.fail(res, "Course not found", null);
            } else {
                Responses.success(res, "Courses found", courses);
            }
        });
    });

    app.get("/course/:course_id/users", AuthService.isStudentOrAdminForCourse, (req, res) => {
        const course_id = parseInt(req.params.course_id, 10);
        if (isNaN(course_id)){ Responses.error(res, "Input Id is not a number", null); }

        Models.Courses.getCourseIncludingUsers(course_id, Models).then(function(courses){
            if (!courses){
                Responses.fail(res, "Course not found", null);
            } else {
                Responses.success(res, "Courses found", courses);
            }
        });
    });

    app.get("/course/:course_id/students",  AuthService.isStudentOrAdminForCourse, (req, res) => {
        const course_id = parseInt(req.params.course_id, 10);
        if (isNaN(course_id)){ Responses.error(res, "Input Id is not a number", null); }

        Models.Courses.getCourseIncludingUsersWithRank (course_id, "student", Models).then(function(courses){
            if (!courses){
                Responses.fail(res, "Course not found", null);
            } else {
                Responses.success(res, "Courses found", courses);
            }
        });
    });

    app.get("/course/:course_id/admins",  AuthService.isStudentOrAdminForCourse, (req, res) => {
        const course_id = parseInt(req.params.course_id, 10);
        if (isNaN(course_id)){ Responses.fail(res, "Input Id is not a number", null); }

        Models.Courses.getCourseIncludingUsersWithRank(course_id, "admin", Models).then(function(courses){
            if (!courses){
                Responses.fail(res, "Course not found", null);
            } else {
                Responses.success(res, "Courses found", courses);
            }
        });
    });
}