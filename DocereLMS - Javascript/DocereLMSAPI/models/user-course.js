module.exports = function(sequelize, Sequelize) {
    const UserCourses = sequelize.define("UserCourses", {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
            field: "usercourse_id"
        },
    });

    UserCourses.insert = async function(user_id, course_id){
        const userCourse = {
            user_id: user_id,
            course_id: course_id
        }

        return await this.create(userCourse);
    }

    return UserCourses;
};