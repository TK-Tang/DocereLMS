module.exports = function(sequelize, Sequelize){
    const Chats = sequelize.define("Chats", {
        id: {
            primaryKey: true,
            autoIncrement: true,
            type: Sequelize.INTEGER,
            field: "chat_id"
        },

        message: {
            type: Sequelize.STRING(4000),
            notEmpty: true
        },

        isPinned: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        }
    }, {underscored: true});

    return Chats;
}