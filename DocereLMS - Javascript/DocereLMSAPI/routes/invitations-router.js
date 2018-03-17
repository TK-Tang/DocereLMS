const Responses = require("../helpers/response");
const Models = require("../models");
const AuthService = require("../middleware/authentication-service");

module.exports = function(app){
    app.get("/course/:course_id/invitations", AuthService.isAdminForCourse, (req, res) => {
        const course_id = parseInt(req.params.course_id, 10)

        if (isNaN(course_id)){ Responses.error(res, "Input Id is not a number", null); }

        Models.Invitations.getAllLinksForCourse(course_id).then(function(invitations){
            if (!invitations){
                Responses.fail(res, "No invitations found", null);
            } else {
                Responses.success(res, "Invitations found", invitations);
            }
        });
    });
}