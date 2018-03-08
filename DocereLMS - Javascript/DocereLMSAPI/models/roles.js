module.exports = function(sequelize, Sequelize) {
    const Roles = sequelize.define("Roles", {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
            field: "course_id"
        }

    });

    name: {
        Sequelize.STRING
    }

    Roles.insert = async function(
        name,
        coordinator,
        pictureLink,
        allowInvitations
    ){
        const user = {
            name : name,
            coordinator: coordinator,
            pictureLink: pictureLink,
            allowInvitations: allowInvitations
        };

        return await this.create(role);
    }

    return Roles;
};