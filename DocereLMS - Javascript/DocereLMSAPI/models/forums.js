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

    Forums.getForum = async function(course_id, forum_id, models){
        return await this.findOne({
            where: { 
                forum_id: forum_id,
                course_id: course_id,
            },
            include: {
                model: models.Topics,
                where: { forum_id: forum_id }
            }
        });
    }

    Forums.getForumById = async function(forum_id){
        return await this.findOne({
            where: { forum_id: forum_id }
        });
    }

    Forums.updateForum = async function(course_id, forum_id, name, description, order, models){
        const forumDetails = {
            name: name,
            description: description,
            order: order
        }

        const t = await sequelize.transaction();
        const currentForum = await models.Forums.getForumById(forum_id);
        const currentCourse = await models.Courses.getCourse(course_id);

        if (!currentCourse){ return null; }
        if (!currentForum){ return null; }

        const updatedForum = await currentForum.updateAttributes(forumDetails, { transation: t });
        t.commit();
        return updatedForum;
    }

    return Forums;
}