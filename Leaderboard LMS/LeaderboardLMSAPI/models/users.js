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
        });
    }

    Users.getUserIncludingCourses = async function(user_id, email, models){
        return await this.findOne({
            where: Sequelize.or({ user_id: user_id }, { email: email }),
            include: [
                { model: models.Courses }
            ]
        });
    }

    Users.getUserIncludingCourse = async function(user_id, email, course_id, models){
        return await this.findOne({
            where: Sequelize.or({ user_id: user_id }, { email: email }),
            include: [
                { 
                    model: models.Courses, 
                    required: false, 
                    where: { course_id: course_id }
                }
            ]
        });
    }
    
    Users.getUserIncludingCourseAndRole = async function(user_id, course_id, models){
        return await this.findOne({
            where: { user_id: user_id},
            include: [
                {
                    model: models.Courses,
                    where: { course_id: course_id }
                },
                { model: models.Roles }
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
                username: { $like: "%" + username + "%" }
            },
            include: [
                { model: models.Roles, required: false }
            ]
        })
    }

    // UPDATE
    Users.updateUser = async function(user_id, email, username, profilePictureLink){
        const updateUserValues = {
            email: email,
            username: username,
            profilePictureLink: profilePictureLink
        }

        const t = await sequelize.transaction();
        const currentUser = await Users.findOne({
            where: { 
                user_id: user_id }
            }, { transaction: t });

        const updatedUser = await currentUser.updateAttributes(updateUserValues, { transaction: t });
        t.commit();
        return updatedUser;
    }

    return Users;
};