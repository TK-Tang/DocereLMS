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

        content: {
            type: Sequelize.STRING,
            notEmpty: true
        },

        order: {
            type: Sequelize.INTEGER
        },

        isLocked: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },

        editedByAdmin: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        }
    }, { underscored: true });

    return Topics;
}