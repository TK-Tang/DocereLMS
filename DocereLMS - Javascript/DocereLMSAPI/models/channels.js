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
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },

        viewChannelOnly: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },

        order: {
            type: Sequelize.INTEGER
        }
    }, { underscored: true });

    return Channels;
}