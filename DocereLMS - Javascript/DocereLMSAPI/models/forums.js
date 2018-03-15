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

        viewOnly: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },

        order: {
            type: Sequelize.INTEGER
        }
    }, { underscored: true });

    return Forums;
}