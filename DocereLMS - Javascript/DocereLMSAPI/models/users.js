module.exports = function(sequelize, Sequelize) {
    const Users = sequelize.define("Users", {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
            field: "user_id"
        },

        email: {
            type: Sequelize.STRING,
            notEmpty: true
        },

        username: {
            type: Sequelize.STRING
        },

        password: {
            type: Sequelize.STRING,
            allowNull: false
        },

        profilePictureLink: {
            type: Sequelize.STRING
        },

        status: {
            type: Sequelize.ENUM("offline", "online"),
            defaultValue: "offline"
        },

        activation: {
            type: Sequelize.ENUM("inactive", "active"),
            defaultValue: "active"
        }
    }, { underscored: true });

    Users.insert = async function(email, username, password, status, activation)
    {
        const user = {
            email: email,
            username: username,
            password: password,
            status: status,
            activation
        };

        return await this.create(user);
    }

    Users.get = async function(email){
        return await this.findOne({
            where: {
                email: email
            },
            include: [
                { model: Role }
            ]
        });
    }

    return Users;
};