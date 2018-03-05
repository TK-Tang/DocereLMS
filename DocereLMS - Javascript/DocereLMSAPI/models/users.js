module.exports = function(sequelize, Sequelize) {
    const User = sequelize.define("User", {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
            field: "user_id"
        },

        email: {

        }
    })
}