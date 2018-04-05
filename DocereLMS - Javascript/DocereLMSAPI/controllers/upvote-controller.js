const Responses = require("../helpers/response");
const Models = require("../models");


exports.upvotePost = function(req, res){
    const post_id = parseInt(req.params.post_id, 10);
    const user_id = req.user.id;
    
    if (isNaN(post_id)){ Responses.error(res, "Input post id is not a number", null); }
    
    Models.Upvotes.insertUpvote(user_id, post_id).then(function(upvote){
        if (!upvote){
            Responses.fail(res, "Post could not be upvoted", null);
        } else {
            Responses.success(res, "Post upvoted", upvote);
        }
    });
}

exports.deleteUpvote = function(req, res){
    const post_id = parseInt(req.params.post_id, 10);
    const user_id = req.user.id;
    
    if (isNaN(post_id)){ Responses.error(res, "Input post id is not a number", null); }
    
    Models.Upvotes.deleteUpvote(user_id, post_id).then(function(upvote){
        if (!upvote){
            Responses.fail(res, "Post upvote could not be removed", null);
        } else {
            Responses.success(res, "Upvote removed", upvote);
        }
    });
}