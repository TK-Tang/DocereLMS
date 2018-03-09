const Models = require("../Models");

module.exports.userCourseScript = function(){
    var userCourseList = {};

    userCourseList.userCourse001 = {
        user_id: 1,
        course_id: 1
    };

    userCourseList.userCourse002 = {
        user_id: 2,
        course_id: 1
    };

    userCourseList.userCourse003 = {
        user_id: 3,
        course_id: 1
    };

    for (var key in userCourseList) {
        var userCourse = userCourseList[key];
        Models.UserCourses.create(userCourse);
    };
}