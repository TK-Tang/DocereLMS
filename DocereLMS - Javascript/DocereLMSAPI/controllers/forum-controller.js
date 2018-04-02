const Responses = require("../helpers/response");
const Models = require("../models");

exports.getForums = function(req, res){
    const course_id = parseInt(req.params.course_id, 10);

    if (isNaN(course_id)){ Response.error(res, "Input id is not a number", null); }

    Models.Forums.getForums(course_id).then(function(forums){
        if(!forums){
            Responses.error(res, "Invitation could not be created", null);
        } else {
            Responses.success(res, "Invitation generated", forums);
        }
    });
}