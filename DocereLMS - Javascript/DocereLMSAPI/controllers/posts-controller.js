const Responses = require("../helpers/response");
const Models = require("../models");

exports.getPostByUser = function(req, res){
    const user_id = parseInt(req.params.user_id, 10);
    const course_id = parseInt(req.params.course_id, 10);
    if (isNaN(user_id)){ Responses.error(res, "Input user ID is not a number", null); }
    if (isNaN(course_id)){ Responses.error(res, "Input course ID is not a number", null); }

    Models.Posts.getPostByUser(user_id, course_id).then(function(posts){
        if (!posts){
            Responses.fail(res, "No posts by this user found", null);
        } else {
            Responses.success(res, "Posts by this user found", posts);
        }
    });
}