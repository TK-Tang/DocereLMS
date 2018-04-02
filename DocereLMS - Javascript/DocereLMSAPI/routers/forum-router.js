const Responses = require("../helpers/response");
const Models = require("../models");
const AuthService = require("../middleware/authentication-service");
const ForumController = require("../controllers/forum-controller");

module.exports = function(app){
   
    app.get("/course/:course_id/forum/:forum_id", AuthService.isStudentOrAdminForCourse, ForumController.getForum);

    app.post("/course/:course_id/forum/:forum_id", AuthService.isAdminForCourse, ForumController.updateForum);
    // app.put("", AuthService.isAdminForCourse, ForumController);
    // app.delete("", AuthService.isAdminForCourse, ForumController);
}