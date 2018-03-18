const Responses = require("../helpers/response");
const Models = require("../models");

exports.getAllLinksForCourse = function(req, res){
    const course_id = parseInt(req.params.course_id, 10)

    if (isNaN(course_id)){ Responses.error(res, "Input Id is not a number", null); }

    Models.Invitations.getAllLinksForCourse(course_id).then(function(invitations){
        if (!invitations){
            Responses.fail(res, "No invitations found", null);
        } else {
            Responses.success(res, "Invitations found", invitations);
        }
    });
};