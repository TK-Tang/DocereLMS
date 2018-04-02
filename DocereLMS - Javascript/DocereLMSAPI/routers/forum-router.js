const Responses = require("../helpers/response");
const Models = require("../models");
const AuthService = require("../middleware/authentication-service");
const ForumController = require("../controllers/forum-controller");

module.exports = function(app){
    app.get("/course/:course_id/forums", AuthService.isStudentOrAdminForCourse, ForumController);
    app.get("/course/:course)id/forums/:forum_id", AuthService.isStudentOrAdminForCourse, ForumController);

    app.post("", AuthService.isAdminForCourse, ForumController);
    app.put("", AuthService.isAdminForCourse, ForumController);
    app.post("", AuthService.isAdminForCourse, ForumController);
}