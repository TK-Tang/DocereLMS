module.exports = function(sequelize, Sequelize){
    const Posts = sequelize.define("Posts", {
        id: {
            primaryKey: true,
            autoIncrement: true,
            type: Sequelize.INTEGER,
            field: "post_id"
        },

        content: {
            type: Sequelize.STRING(2048),
        },

        wasEdited: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },

        editedByAdmin: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        }
    }, { underscored: true });

    return Posts;
}