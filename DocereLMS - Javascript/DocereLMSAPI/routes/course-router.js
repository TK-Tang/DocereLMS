const Responses = require("../helpers/response");
const Models = require("../models");

module.exports = function(app){
    app.get("/course/:course_id", (req, res) => {
        const course_id = parseInt(req.params.course_id, 10);
        if (isNaN(course_id)){ return res.status(400).send(Responses.fail("Input Id is not a number")); }

        Models.Courses.getCourse(course_id, Models).then(function(courses){
            if (!courses){
                return res.status(400).send(Responses.fail("Course not found"));
            } else {
                return res.status(200).send(Responses.success(courses));
            }
        });
    });

    app.get("/course/:course_id/users", (req, res) => {
        const course_id = parseInt(req.params.course_id, 10);
        if (isNaN(course_id)){ return res.status(400).send(Responses.fail("Input Id is not a number")); }

        Models.Courses.getCourseIncludingUsers(course_id, Models).then(function(courses){
            if (!courses){
                return res.status(400).send(Responses.fail("Course not found"));
            } else {
                return res.status(200).send(Responses.success(courses));
            }
        });
    });

    app.get("/course/:course_id/students", (req, res) => {
        const course_id = parseInt(req.params.course_id, 10);
        if (isNaN(course_id)){ return res.status(400).send(Responses.fail("Input Id is not a number")); }

        Models.Courses.getCourseIncludingUsersWithRank (course_id, "student", Models).then(function(courses){
            if (!courses){
                return res.status(400).send(Responses.fail("Course not found"));
            } else {
                return res.status(200).send(Responses.success(courses));
            }
        });
    });

    app.get("/course/:course_id/admins", (req, res) => {
        const course_id = parseInt(req.params.course_id, 10);
        if (isNaN(course_id)){ return res.status(400).send(Responses.fail("Input Id is not a number")); }

        Models.Courses.getCourseIncludingUsersWithRank(course_id, "admin", Models).then(function(courses){
            if (!courses){
                return res.status(400).send(Responses.fail("Course not found"));
            } else {
                return res.status(200).send(Responses.success(courses));
            }
        });
    });
}