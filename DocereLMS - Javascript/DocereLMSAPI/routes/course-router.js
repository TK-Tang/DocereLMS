const Responses = require("../helpers/response");
const Models = require("../models");

module.exports = function(app){
    app.get("/course/:course_id", (req, res) => {
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

    app.get("/course/:course_id/users", (req, res) => {
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

    app.get("/course/:course_id/students", (req, res) => {
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

    app.get("/course/:course_id/admins", (req, res) => {
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