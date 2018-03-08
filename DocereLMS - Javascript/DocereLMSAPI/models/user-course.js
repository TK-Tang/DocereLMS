module.exports = function(sequelize, Sequelize) {
    const UserCourses = sequelize.define("UserCourses", {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
            field: "usercourse_id"
        },
    });

    return UserCourses;
};