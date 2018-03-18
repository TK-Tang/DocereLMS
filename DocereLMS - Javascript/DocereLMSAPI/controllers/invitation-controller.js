const Responses = require("../helpers/response");
const Models = require("../models");

exports.insertInvitation = function(req, res){
    const course_id = parseInt(req.params.course_id, 10);

    if (isNaN(course_id)){ Response.error(res, "Input id is not a number", null); }

    Models.Invitations.insert(course_id).then(function(invitation){
        if(!invitation){
            Responses.error(res, "Invitation could not be created", null);
        } else {
            Responses.success(res, "Invitation generated", invitation);
        }
    });
};

exports.deleteInvitation = function(req, res){
    const course_id = parseInt(req.params.course_id, 10);
    const invitation_id = parseInt(req.params.invitation_id, 10);

    if (isNaN(course_id) || isNaN(invitation_id)){ Responses.error(res, "Input Ids are not numbers", null); }

    Models.Invitations.delete(course_id, invitation_id).then(function(numberOfInvitationsDeleted){
        if(numberOfInvitationsDeleted != 1){
            Responses.error(res, "Error with deleting invitation", null);
        } else {
            Responses.success(res, "Invitation deleted successfully", null);
        }
    });
}