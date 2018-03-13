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
    Users.getUser = async function(user_id, email, models){
        return await this.findOne({
            where: Sequelize.or({ user_id: user_id }, { email: email }),
            include: [
                { model: models.Roles }
            ]
        });
    }

    Users.getUser = async function(email) {
        return await this.findOne({
            where: {
                email: email
            }
        });
    }

    Users.getUserIncludingCourses = async function(user_id, email, models){
        return await this.findOne({
            where: Sequelize.or({ user_id: user_id }, { email: email }),
            include: [
                { model: models.Roles },
                { model: models.Courses }
            ]
        })
    }

    Users.getUserIncludingCourse = async function(user_id, email, course_id, models){
        return await this.findOne({
            where: Sequelize.or({ user_id: user_id }, { email: email }),
            include: [
                { model: models.Roles },
                { 
                    model: models.Courses, 
                    required: false, 
                    where: { course_id: course_id }
                }
            ]
        });
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
                username: username
            },
            include: [
                { model: models.Roles, required: false }
            ]
        })
    }

    return Users;
};