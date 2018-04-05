const Responses = require("../helpers/response");
const Models = require("../models");

exports.getPostByUser = function(req, res){
    const user_id = parseInt(req.params.user_id, 10);
    if (isNaN(user_id)){ Responses.error(res, "Input user id is not a number", user); }

    Models.Posts.getPostByUser(user_id).then(function(posts){
        if (!posts){
            Responses.fail(res, "No posts by this user found", null);
        } else {
            Responses.success(res, "Posts by this user found", posts);
        }
    });
}