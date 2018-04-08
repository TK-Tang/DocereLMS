const Responses = require("../helpers/response");
const AuthService = require("../middleware/authentication-service");
const PostController = require("../controllers/post-controller");

module.exports = function(app){
    app.get("/course/:course_id/post/:post_id", AuthService.isStudentOrAdminForCourse, PostController.getPost);
    app.put("/course/:course_id/topic/:topic_id", AuthService.isStudentOrAdminForCourse, PostController.insertPost);
    app.post("/course/:course_id/post/:post_id", AuthService.isPostOwner, PostController.updatePost);
    app.delete("/course/:course_id/post/:post_id", AuthService.isPostOwner, PostController.deletePost);
}