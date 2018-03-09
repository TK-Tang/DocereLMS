

module.exports = function(sequelize, Sequelize) {
    const Roles = sequelize.define("Roles", {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
            field: "role_id"
        },

        rank: {
            type: Sequelize.STRING
        }
    });

    Roles.insert = async function(rank){
        const role = { rank : rank};
        return await this.create(role);
    }

    return Roles;
};