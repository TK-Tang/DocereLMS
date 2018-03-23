module.exports = function(sequelize, Sequelize){
    const Channels = sequelize.define("Channels", {
        id: {
            primaryKey: true,
            autoIncrement: true,
            type: Sequelize.INTEGER,
            field: "channel_id"
        },

        name: {
            type: Sequelize.STRING,
            notEmpty: true
        },

        description: {
            type: Sequelize.STRING
        },

        adminChannelOnly: {
            type: Sequelize.BOOLEAN
        },

        viewChannelOnly: {
            type: Sequelize.BOOLEAN
        },

        order: {
            type: Sequelize.INTEGER
        }
    }, { underscored: true });

    return Channels;
}