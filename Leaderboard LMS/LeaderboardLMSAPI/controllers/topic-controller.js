const Responses = require("../helpers/response");
const Models = require("../models");


exports.getTopic = function(req, res){
    const topic_id = parseInt(req.params.topic_id, 10);
    if (isNaN(topic_id)){ Responses.error(res, "Topic ID is not a number", null); }

    Models.Topics.getTopic(topic_id, Models).then(function(topic){
        if (!topic){
            Responses.fail(res, "Topic not found", null);
        } else {
            Responses.success(res, "Topic found", topic);
        }
    });
}

exports.insertTopic = function(req, res){
    const forum_id = parseInt(req.params.forum_id, 10);
    const user_id = req.user.id;
    const title = req.body.title;
    const content = req.body.content;
    if (isNaN(forum_id)){ Responses.error(res, "Forum ID is not a number", null); }

    Models.Topics.insertTopic(user_id, title, content, Models).then(function(topic){
        if (!topic){
            Responses.fail(res, "Topic could not be created", null);
        } else {
            Responses.success(res, "Topic created", topic);
        }
    });
}

exports.getTopicsByUser = function(req, res){
    const user_id = req.user.id;
    const course_id = parseInt(req.params.course_id, 10);
    if (isNaN(course_id)){ Responses.error(res, "Course ID is not a number", null); }

    Models.Topics.getTopicsByUser(user_id, course_id, Models).then(function(topics){
        if (!topics){
            Responses.fail(res, "No topics for this user could be found", null);
        } else {
            Responses.success(res, "Topics found", topics);
        }
    });
}

exports.updateTopic = function(req, res){
    const topic_id = parseInt(req.params.topic_id, 10);
    const title = req.body.params;
    if (isNaN(topic_id)){ Responses.error(res, "Topic ID is not a number", null); }

    Models.Topics.updateTopic(topic_id, title).then(function(topic){
        if (!topic){
            Responses.fail(res, "Topic could not be updated", null);
        } else {
            Responses.success(res, "Topic updated", topic);
        }
    });
}

exports.pinTopic = function(req, res){
    const topic_id = parseInt(req.params.topic_id, 10);
    if (isNaN(topic_id)){ Responses.error(res, "Topic ID is not a number", null); }

    Models.Topics.pinTopic(topic_id).then(function(topic){
        if (!topic){
            Responses.fail(res, "Topic could not be pinned", null);
        } else {
            Responses.success(res, "Topic pinned", topic);
        }
    });
}

exports.unpinTopic = function(req, res){
    const topic_id = parseInt(req.params.topic_id, 10);
    if (isNaN(topic_id)){ Responses.error(res, "Topic ID is not a number", null); }

    Models.Topics.unpinTopic(topic_id).then(function(topic){
        if (!topic){
            Responses.fail(res, "Topic could not be unpinned", null);
        } else {
            Responses.success(res, "Topic unpinned", topic);
        }
    });
}