const Responses = require("../helpers/response");
const AuthService = require("../middleware/authentication-service");
const TopicController = require("../controllers/topic-controller");

module.exports = function(app){
    app.get("/course/:course_id/topic/:topic_id", AuthService.isStudentOrAdminForCourse, TopicController.getTopic);
    app.put("/course/:course_id/forum/:forum_id/topic", AuthService.isStudentOrAdminForCourse, TopicController.insertTopic);
    app.post("/course/:course_id/topic/:topic_id", AuthService.isTopicOwner, TopicController.updateTopic);
    app.post("/course/:course_id/topic/:topic_id/pin", AuthService.isAdminForCourse, TopicController.pinTopic);
    app.post("/course/:course_id/topic/:topic_id/unpin", AuthService.isAdminForCourse, TopicController.unpinTopic);
    app.delete("/course/:course_id/topic/:topic_id", AuthService.isTopicOwner, TopicController.deleteTopic);
}