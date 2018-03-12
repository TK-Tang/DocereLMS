const Responses = require("../helpers/response");
const Models = require("../models");

module.exports = function(app){
    app.get("/user/:term", (req, res) => {
        const email = req.params.term;
        var user_id = parseInt(req.params.term, 10);
        user_id = isNaN(user_id) ? null : user_id;

        Models.Users.getUser(user_id, email, Models).then(function(user){
            if (user){
                return res.status(200).send(Responses.success(user));
            } else {
                return res.status(400).send(Responses.fail("No user found"));
            }
        });
    });

    app.get("/user/:term/courses", (req, res) => {
        const email = req.params.term;
        var user_id = parseInt(req.params.term, 10);
        user_id = isNaN(user_id) ? null : user_id;

        Models.Users.getUserIncludingCourses(user_id, email, Models).then(function(user){
            if (user){
                return res.status(200).send(Responses.success(user));
            } else {
                return res.status(400).send(Responses.fail("No user found"));
            }
        });
    });

    app.get("/user/:term/course/:course_id", (req, res) => {
        const email = req.params.term;
        var user_id = parseInt(req.params.term, 10);
        user_id = isNaN(user_id) ? null : user_id;

        Models.Users.getUserIncludingCourse(user_id, email, course_id, Models).then(function(user){
            if (user){
                return res.status(200).send(Responses.success(user));
            } else {
                return res.status(400).send(Responses.fail("No user found"));
            }
        });
    });

    app.get("/users/:term", (req, res) => {
        const username = req.params.term;

        Models.Users.getUsersByUsername(username, Models).then(function(users){
            if (users){
                return res.status(200).send(Responses.success(users));
            } else {
                return res.status(400).send(Responses.fail("No users found"));
            }
        })
    });
}

