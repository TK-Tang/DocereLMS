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

        isLocked: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },

        isPinned: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
    }, { underscored: true });

    return Topics;
}