const Responses = require("../helpers/response");
const Models = require("../models");

exports.getPost = function(req, res){
    const post_id = parseInt(req.params.post_id, 10);
    if (isNaN(post_id)){ Responses.error(res, "Input Id is not a number", null); }

    Models.Posts.getPost(post_id).then(function(post){
        if (!post){
            Responses.fail(res, "Post not found", null);
        } else {
            Responses.success(res, "Post found", post);
        }
    });
}

exports.insertPost = function(req, res){
    const topic_id = parseInt(req.params.topic_id, 10);
    const user_id = req.user.id;
    const content = req.body.content;
    if (isNaN(topic_id)){ Responses.error(res, "Topic Id is not a number", null); }

    Models.Posts.insertPost(user_id, topic_id, content).then(function(post){
        if (!post){
            Responses.fail(res, "Post could not be created", null);
        } else {
            Responses.success(res, "Post created", post);
        }
    });
}

exports.updatePost = function(req, res){
    const post_id = parseInt(req.params.post_id, 10);
    const content = req.body.contents;

    if (isNaN(post_id)){ Responses.error(res, "Post Id is not a number", null); }
    
    Models.Posts.updatePost(post_id, content, true).then(function(post){
        if (!post){
            Responses.fail(res, "Post could not be updated", null);
        } else {
            Responses.success(res, "Post updated", post);
        }
    });
}

exports.deletePost = function(req, res){
    const post_id = parseInt(req.params.post_id, 10);

    if (isNaN(post_id)){ Responses.error(res, "Post Id is not a number", null); }

    Models.Posts.deletePost(post_id).then(function(post){
        if (!post){
            Responses.fail(res, "Post could not be deleted", null);
        } else {
            Responses.success(res, "Post deleted", post);
        }
    })
}

