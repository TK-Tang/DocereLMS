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
        }

    }, { underscored: true });

    // CREATE
    Courses.insert = async function(name, coordinator, pictureLink, allowInvitations){
        const course = {
            name : name,
            coordinator: coordinator,
            pictureLink: pictureLink,
            allowInvitations: allowInvitations
        };

        return await this.create(course);
    }

    // READ
    Courses.getCourse = async function(course_id, models){
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

    return Courses;
};