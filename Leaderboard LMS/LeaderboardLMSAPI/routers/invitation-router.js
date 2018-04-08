const Responses = require("../helpers/response");
const Models = require("../models");
const AuthService = require("../middleware/authentication-service");
const InvitationController = require("../controllers/invitation-controller");

module.exports = function(app){
    app.put("/course/:course_id/invitation",  AuthService.isAdminForCourse, InvitationController.insertInvitation);
    app.delete("/course/:course_id/invitation/:invitation_id", AuthService.isAdminForCourse, InvitationController.deleteInvitation);
}