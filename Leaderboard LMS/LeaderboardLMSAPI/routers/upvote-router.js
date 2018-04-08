const Responses = require("../helpers/response");
const AuthService = require("../middleware/authentication-service");
const UpvoteController = require("../controllers/upvote-controller");

module.exports = function(app){
    app.put("/course/:course_id/upvote/:post_id", AuthService.isStudentOrAdminForCourse, UpvoteController.upvotePost);
    app.delete("/course/:course_id/upvote/:post_id", AuthService.isStudentOrAdminForCourse, UpvoteController.deleteUpvote);
}