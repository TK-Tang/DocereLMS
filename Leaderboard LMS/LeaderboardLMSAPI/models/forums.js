const Models = require("../models");

module.exports = function(sequelize, Sequelize){
    const Forums = sequelize.define("Forums", {
        id: {
            primaryKey: true,
            autoIncrement: true,
            type: Sequelize.INTEGER,
            field: "forum_id"
        },

        name: {
            type: Sequelize.STRING,
            notEmpty: true
        },

        description: {
            type: Sequelize.STRING
        },

        order: {
            type: Sequelize.INTEGER
        }
    }, { underscored: true });

    Forums.getForum = async function(course_id, forum_id){
        return await this.findOne({
            where: { 
                forum_id: forum_id,
                course_id: course_id,
            },
            include: {
                model: Models.Topics,
                where: { forum_id: forum_id }
            }
        });
    }

    Forums.getForumById = async function(forum_id){
        return await this.findOne({
            where: { forum_id: forum_id }
        });
    }

    Forums.insertForum = async function(course_id, name, description, order){
        const forumDetails = {
            name: name,
            description: description,
            order: order,
            course_id: course_id
        }

        const currentCourse = await Models.Courses.getCourse(course_id);
        if (!currentCourse){ return null; }

        return  this.create(forumDetails);
    }

    Forums.updateForum = async function(course_id, forum_id, name, description, order){
        const forumDetails = {
            name: name,
            description: description,
            order: order
        }

        const t = await sequelize.transaction();
        const currentForum = await Models.Forums.getForumById(forum_id);
        const currentCourse = await Models.Courses.getCourse(course_id);

        if (!currentCourse){ return null; }
        if (!currentForum){ return null; }

        const updatedForum = await currentForum.updateAttributes(forumDetails, { transation: t });
        t.commit();
        return updatedForum;
    }

    Forums.deleteForum = async function(course_id, forum_id){
        const t = await sequelize.transaction();
        const forum = await this.getForum(forum_id);

        forum.Topics.forEach(function(topic){
            var deletedTopic = Models.Topics.deleteTopic(topic.topic_id);
            if (!deletedTopic){ return null; }
        });

        const destroyed = await this.destroy({
            where: { forum_id: forum_id }
        });

        if (destroyed != 1){
            throw new Error("Expected one forum to be deleted. Instead, " + destroyed + " forums were deleted."); 
        } else {
            return forum;
        }
    }

    return Forums;
}