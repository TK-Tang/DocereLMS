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

    Courses.insert = async function(
        name,
        coordinator,
        pictureLink,
        allowInvitations
    ){
        const course = {
            name : name,
            coordinator: coordinator,
            pictureLink: pictureLink,
            allowInvitations: allowInvitations
        };

        return await this.create(course);
    }

    return Courses;
};