module.exports = function(sequelize, Sequelize) {
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
            where: { course_id: course_id},
        })
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

    Courses.getCourseIncludingUsersWithRank = async function(course_id, rank, models){
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

    return Courses;
};