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

    // READ
    Forums.getForums = async function(course_id){
        return await this.findAll({
            where: { course_id: course_id }
        });
    }

    return Forums;
}