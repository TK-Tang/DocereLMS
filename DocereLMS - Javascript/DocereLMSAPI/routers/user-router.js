const Responses = require("../helpers/response");
const Models = require("../models");
const AuthServices = require("../middleware/authentication-service");

module.exports = function(app){
    app.get("/user/:term", AuthServices.isLoggedIn, (req, res) => {
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
    });

    app.get("/user/:term/courses", AuthServices.isLoggedIn, (req, res) => {
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
    });

    app.get("/user/:term/course/:course_id", AuthServices.isLoggedIn, (req, res) => {
        const email = req.params.term;
        var user_id = parseInt(req.params.term, 10);
        user_id = isNaN(user_id) ? null : user_id;

        Models.Users.getUserIncludingCourse(user_id, email, course_id, Models).then(function(user){
            if (!user){
                Responses.fail(res, "No user found", null);
            } else {
                Responses.success(res, "No user found", user);
            }
        });
    });

    app.post("/user/:term", AuthServices.IsCurrentUser, (req, res) => {
        const email = req.body.email;
        const username = req.body.username;
        const profilePictureLink = req.body.profilePictureLink;

        if (!email){
            Responses.fail(res, "Email cannot be empty", null);
        } else if (!username){
            Responses.fail(res, "Username cannot be empty", null);
        }

        Models.Users.update(email, username, profilePictureLink).then(function(user){
            if (!user){
                Responses.fail(res, "Error updating user", null);
            } else {
                Responses.success(res, "User updated successfully", user);
            }
        });
    });
}

