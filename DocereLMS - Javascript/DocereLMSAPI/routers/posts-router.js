const Responses = require("../helpers/response");
const AuthService = require("../middleware/authentication-service");
const PostsController = require("../controllers/posts-controller");

module.exports = function(app){
    app.get("/course/:course_id/posts/user/:user_id", AuthService.isStudentOrAdminForCourse, PostsController.getPostByUser);
}