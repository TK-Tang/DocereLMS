const Responses = require("../helpers/response");
const Models = require("../models");

exports.getForum = function(req, res){
    const course_id = parseInt(req.params.course_id, 10);
    const forum_id = parseInt(req.params.forum_id, 10);

    if (isNaN(course_id)){ Response.error(res, "Input id is not a number", null); }
    else if (isNaN(forum_id)){ Response.error(res, "Input id is not a number", null); }

    Models.Forums.getForum(course_id, forum_id, Models).then(function(forum){
        if(!forum){
            Responses.error(res, "Forum not found", null);
        } else {
            Responses.success(res, "Forum found", forum)
        }
    });
}

exports.updateForum = function(req, res){
    const course_id = parseInt(req.params.course_id, 10);
    const forum_id = parseInt(req.params.forum_id, 10);
    const name = req.body.name;
    const description = req.body.description;
    const order = req.body.order;

    Models.Forums.updateForum(course_id, forum_id, name, description, order, Models).then(function(forum){
        if(!forum){
            Responses.fail(res, "Forum could not be updated", null);
        } else {
            Responses.success(res, "Forum updated", forum);
        }
    });
}