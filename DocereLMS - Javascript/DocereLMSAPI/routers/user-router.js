const Responses = require("../helpers/response");
const Models = require("../models");
const AuthServices = require("../middleware/authentication-service");
const UserController = require("../controllers/user-controller");

module.exports = function(app){
    app.get("/user/:term", AuthServices.isLoggedIn, UserController.getUser);
    app.get("/user/:term/course/:course_id", AuthServices.isLoggedIn, UserController.getUserIncludingCourse);
    app.get("/user/:term/courses", AuthServices.isLoggedIn, UserController.getUserIncludingCourses);
    app.post("/user/:term", AuthServices.IsCurrentUser, UserController.updateuser);
}

