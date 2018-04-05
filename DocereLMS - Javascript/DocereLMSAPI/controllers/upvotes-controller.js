const Responses = require("../helpers/response");
const Models = require("../models");

exports.getUpvotesByPost = function(req, res){
    const post_id = parseInt(req.params.post_id, 10);

    if (isNaN(course_id)){ Responses.error(res, "Input post Id is not a number", null); }

    Models.Upvotes.getUpvotesByPost(post_id).then(function(upvotes){
        if (!upvotes){
            Responses.fail(res, "No upvotes found", null);
        } else {
            Resposes.success(res, "Upvotes found", upvotes);
        }
    });
}

exports.getUpvotesCastByUser = function(req, res){
    const user_id = parseInt(req.params.user_id, 10);

    if (isNaN(user_id)){ Responses.error(res, "Input user Id is not a number", null); }

    Models.Upvotes.getUpvotesCastByUser(user_id).then(function(upvotes){
        if (!upvotes){
            Responses.fail(res, "No upvotes found issued by user", null);
        } else {
            Resposes.success(res, "Upvotes found", upvotes);
        }
    });
}

exports.getUpvotesReceivedByUser = function(req, res){
    const user_id = parseInt(req.params.user_id, 10);

    if (isNaN(user_id)){ Responses.error(res, "Input user Id is not a number", null); }

    Models.Upvotes.getUpvotesReceivedByUser(user_id, Models).then(function(){
        if (!upvotes){
            Responses.fail(res, "No upvotes found received by user", null);
        } else {
            Resposes.success(res, "Upvotes received by user found", upvotes);
        }
    });
}