module.exports = function(sequelize, Sequelize){
    const Resources = sequelize.define("Resources", {
        id: {
            primaryKey: true,
            autoIncrement: true,
            type: Sequelize.INTEGER,
            field: "resource_id"
        },

        name: {
            type: Sequelize.STRING,
            notEmpty: true
        },

        description: {
            type: Sequelize.STRING
        },

        path: {
            type: Sequelize.STRING(1024)
        },

        isPinned: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },

        order: {
            type: Sequelize.INTEGER
        }
    }, { underscored: true });

    return Resources;
}