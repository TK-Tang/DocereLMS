module.exports = function(sequelize, Sequelize){
    const Courses = sequelize.define("Courses", {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
            field: "course_id"
        },

        name: {
            type: Sequelize.STRING,
            notEmpty: true
        },

        description: {
            type: Sequelize.STRING
        },

        coordinator: {
            type: Sequelize.STRING
        },

        pictureLink: {
            type: Sequelize.STRING,
            allowNull: false
        },

        allowInvitations: {
            type: Sequelize.BOOLEAN,
        },

        isActive: {
            type: Sequelize.BOOLEAN,
            defaultValue: true
        }

    }, { underscored: true });

    Courses.insert = async function(name, coordinator, pictureLink, allowInvitations){
        const course = {
            name : name,
            coordinator: coordinator,
            pictureLink: pictureLink,
            allowInvitations: allowInvitations
        };

        return await this.create(course);
    }

    Courses.getCourse = async function(course_id){
        return await this.findOne({
            where: { course_id: course_id}
        })
    }

    Courses.getCourseIncludeUser = async function(course_id, user_id, email, models){
        return await this.findOne({
            where: { course_id: course_id },
            include: [
                { 
                    model: models.Users,
                    where: Sequelize.or({ user_id: user_id}, { email: email }),
                }
            ]
        });
    }

    Courses.getCourseIncludingUsers = async function(course_id, models){
        return await this.findAll({
            where: { course_id: course_id },
            include: [
                { 
                    model: models.Users, 
                    attributes: ["user_id", "username", "email", "profilePictureLink", "status"],
                    required: false,
                    through: { 
                        attributes: ["id", "rank", "user_id", "course_id"]
                    }
                }
            ]
        });
     }

    Courses.getCourseIncludingUsersAndRank = async function(course_id, rank, models){
       return await this.findAll({
           where: { course_id: course_id },
           include: [
                { 
                    model: models.Users, 
                    attributes: ["user_id", "username", "email", "profilePictureLink", "status"],
                    required: false,
                    order: [
                        [ "username", "DESC"]
                    ],
                    through: { 
                        attributes: ["id", "rank", "user_id", "course_id"],
                        where: { rank: rank }
                    }
                }
            ]
       });
    }

    Courses.getCourseIncludesChannels = async function(course_id, models){
        return await this.findOne({
            where: { course_id: course_id },
            include: [
                {
                    model: models.Channels,
                    attributes: ["name", "description", "adminChannelOnly", "viewChannelOnly", "order"],
                    required: false,
                    order: [
                        ["name", "DESC"]
                    ]
                }
            ]
        });
    }

    Courses.getCourseIncludesForums = async function(course_id, models){
        return await this.findOne({
            where: { course_id: course_id },
            include: [
                {
                    model: models.Forums,
                    attributes: ["name", "description", "order"],
                    required: false,
                    order: [
                        "name", "DESC"
                    ]
                }
            ]
        });
    }

    Courses.getCourseIncludesCategories = async function(course_id, models){
        return await this.findOne({
            where: { course_id: course_id },
            include: [
                {
                    model: models.Categories,
                    attributes: ["name", "description", "adminOnly", "order"],
                    required: false,
                    order: [
                        "name", "DESC"
                    ]
                }
            ]
        });
    }


    Courses.insertCourse = async function(user_id, email, name, description, coordinator, pictureLink, allowInvitations, models){
        const courseDetails = {
            name: name,
            description: description,
            coordinator: coordinator,
            pictureLink: pictureLink,
            allowInvitations: allowInvitations
        };

        const t = await sequelize.transaction();
        const user = await models.Users.findOne({ where: Sequelize.or({ user_id: user_id }, { email: email }) });
        if (!user){ 
            t.rollback();
            throw new Error("This user could not be found."); 
        }

        const course = await this.create(courseDetails, {transaction: t});
        if (!course){ 
            t.rollback();
            throw new Error("Course could not be created."); 
        }

        const roleDetails = {
            course_id: course.id,
            user_id: user.id,
            rank: "admin"
        }
        
        const Role = await models.Roles.create(roleDetails, {transaction: t}).catch(e => {
            console.log(e);
            t.rollback();
        });

        if (Role){ t.commit(); }
        return course;
    }

    Courses.deactivateCourse = async function(course_id, isActive){
        const courseDetails = {
            isActive: isActive
        }

        const t = await sequelize.transaction();
        const currentCourse = await Courses.findOne({ 
            where: { course_id: course_id }}, 
            { transaction: t }
        );

        const updatedCourse = await currentCourse.updateAttributes(courseDetails, { transaction: t });
        t.commit();
        return updatedCourse;
    }

    Courses.updateCourse = async function(course_id, name, description, coordinator, pictureLink, allowInvitations, models){
        const courseDetails = {
            name: name,
            description: description,
            coordinator: coordinator,
            pictureLink: pictureLink,
            allowInvitations: allowInvitations
        }

        const t = await sequelize.transaction();
        const currentCourse = await Courses.findOne({
            where: { course_id: course_id }},
            { transaction: t }
        );

        if (!currentCourse){ return null; }
        const updatedCourse = await currentCourse.updateAttributes(courseDetails, { transaction: t });
        t.commit();
        return updatedCourse;
    }

    Courses.setUserAsAdmin = async function(course_id, user_id, models){
        const user = await models.Users.findOne({
            where: { user_id: user_id }
        });

        if (!user){ return null; }
        
        const role = await models.Roles.findOne({
            where: { 
                user_id: user_id,
                course_id: course_id
            }
        });
        if (!role){ return null; }

        await role.updateAttributes({ rank: "admin"});
        return await this.findOne({ where: { course_id: course_id }});
    }

    Courses.kickUser = async function(course_id, user_id, models){
        const t = await sequelize.transaction();
        const user = await models.Users.findOne({
            where: { user_id: user_id }
        });
        if (!user){ return null; }

        const role = await models.Roles.findOne({
            where: { 
                user_id: user_id,
                course_id: course_id
            }
        });
        if (!role){ return null; }

        const destroyed = await models.Roles.destroy({
            where: {
                role_id: role.id
            }
        }, { transaction: t });

        if (destroyed != 1){ t.rollback(); return null; }

        return user;
    }

    return Courses;
};