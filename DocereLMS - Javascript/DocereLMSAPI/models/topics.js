const Models = require("../models");

module.exports = function(sequelize, Sequelize){
    const Topics = sequelize.define("Topics", {
        id: {
            primaryKey: true,
            autoIncrement: true,
            type: Sequelize.INTEGER,
            field: "topic_id"
        },

        title: {
            type: Sequelize.STRING,
            notEmpty: true
        },

        isPinned: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
    }, { underscored: true });


    Topics.getTopic = async function(topic_id){
        return await this.findOne({
            where: { topic_id: topic_id },
            include: [
                { 
                    model: models.Posts,
                    where:{ topic_id: topic_id }
                }
            ]
        });
    }

    Topics.getTopicsByUser = async function(user_id, course_id){
        return await this.findAll({
            where: { user_id: user_id },
            include: [
                {
                    model: models.Forums,
                    where: { course_id: course_id }
                }
            ]
        })
    }

    Topics.getTopicExcludePosts = async function(topic_id){
        return await this.findOne({
            where: { topic_id: topic_id }
        });
    }

    Topics.insertTopic = async function(user_id, title, content){
        const t = await sequelize.transaction();
        const topicDetails = { 
            user_id: user_id,
            forum_id: forum_id,
            title: title 
        };

        const topic = await this.create(topicDetails, { transaction: t });

        const postDetails = {
            user_id: user_id,
            topic_id: topic.topic_id,
            content: content
        }

        const post = await Models.Posts.create(postDetails, { transaction: t });

        return topic;
    }

    Topics.updateTopic = async function(topic_id, title){
        const topicDetails = {
            title: title
        }

        const currentTopic = await this.findOne({
            where: { topic_id: topic_id }
        });

        if (!currentTopic){ return null; }

        return this.currentCourse.updateAttributes(topicDetails);
    }

    Topics.pinTopic = async function(topic_id){
        const topicDetails = {
            isPinned: true
        }

        const currentTopic = await this.getTopicExcludePosts(topic_id);

        if (!currentTopic){ return null; }

        return this.currentCourse.updateAttributes(topicDetails);
    }

    Topics.unpinTopic = async function(topic_id){
        const topicDetails = {
            isPinned: false
        }

        const currentTopic = await this.getTopicExcludePosts(topic_id);

        if (!currentTopic){ return null; }

        return this.currentCourse.updateAttributes(topicDetails);
    }

    Topics.deleteTopic = async function(topic_id){
        const topic = await this.getTopic(topic_id);

        topic.Posts.forEach(function(post){
            var deletedPost = Models.Posts.deletePost(post.post_id);
        });

        const destroyed = await this.destroy({
            where: { topic_id: topic_id }
        });

        if (destroyed != 1){
            throw new Error("Expected one topi to be deleted. Instead, " + destroyed + " topics were deleted."); 
        } else {
            return topic;
        }
    }

    return Topics;
}