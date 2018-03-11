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

    // CREATE
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

    // READ - returning a single user


    Users.getUserById = async function(id, models){
        return await this.findOne({
            where: {
                user_id: id
            },
            include: [
                { model: models.Roles, require: true }
            ]
        });
    }

    Users.getUserByEmail = async function(email, models){
        return await this.findOne({
            where: {
                email: email
            },
            include: [
                { model: models.Roles, required: true }
            ]
        });
    }

    Users.getUserByIdIncludingCourses = async function(id, models){
        return await this.findOne({
            where: {
                user_id: id
            },
            include: [
                { model: models.Courses, required: false }
            ]
        })
    }

    Users.getUserByEmailIncludingCourses = async function(email, models){
        return await this.findOne({
            where: {
                email: email
            },
            include: [
                { model: models.Courses, required: false }
            ]
        })
    }

    // READ - returning a list of users

    Users.getAll = async function(models){
        return await this.findAll({
            include: [
                { model: models.Roles, required: false }
            ]
        })
    }

    Users.getUsersByUsername = async function(username, models){
        return await this.findAll({
            where: {
                email: email
            },
            include: [
                { model: models.Roles, required: false }
            ]
        })
    }

    return Users;
};