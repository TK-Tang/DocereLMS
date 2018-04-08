const Responses = require("../helpers/response");
const Models = require("../models");
const AuthService = require("../middleware/authentication-service");
const InvitationsController = require("../controllers/invitations-controller");

module.exports = function(app){
    app.get("/course/:course_id/invitations", AuthService.isAdminForCourse, InvitationsController.getAllLinksForCourse);
}