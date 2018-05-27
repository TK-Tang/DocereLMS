const Responses = require("../helpers/response");
const AuthService = require("../middleware/authentication-service");
const ChannelController = require("../controllers/channel-controller");

module.exports = function(app){
    app.get("/course/:course_id/channel/:channel_id", AuthService.isStudentOrAdminForCourse, ChannelController.getChannel);
}