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
        });
    });

    app.post("/users/:term", (req, res) => {
        const email = req.body.email;
        const username = req.body.username;
        const profilePictureLink = req.body.profilePictureLink;

        if (!email){
            return res.status(400).send(Responses.fail("Email cannot be empty"));
        } else if (!username){
            return res.status(400).send(Responses.fail("Username cannot be empty"));
        }

        Models.Users.update(email, username, profilePictureLink).then(function(user){
            if (!user){
                return res.status(400).send(Responses.fail("Error updating user"));
            } else {
                return res.status(400).send(Responses.success("User updated successfully"));
            }
        });
    });
}

