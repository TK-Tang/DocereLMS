const Responses = require("../helpers/response");
const AuthService = require("../middleware/authentication-service");
const UpvotesController = require("../controllers/upvotes-controller");

module.exports = function(app){
    app.get("/course/:course_id/upvotes/:post_id", AuthService.isStudentOrAdminForCourse, UpvotesController.getUpvotesByPost);
    app.get("/course/:course_id/upvotes/user/:user_id/issued", AuthService.isStudentOrAdminForCourse, UpvotesController.getUpvotesCastByUser);
    app.get("/course/:course_id/upvotes/user/:user_id/received", AuthService.isStudentOrAdminForCourse, UpvotesController.getUpvotesReceivedByUser);
}