const Responses = require("../helpers/response");
const Models = require("../models");
const AuthService = require("../middleware/authentication-service");
const CourseController = require("../controllers/course-controller");

module.exports = function(app){
    app.get("/course/:course_id", AuthService.isStudentOrAdminForCourse, CourseController.getCourse);
    app.get("/course/:course_id/user/:term", AuthService.isStudentOrAdminForCourse, CourseController.getCourseIncludingUser);
    app.get("/course/:course_id/users", AuthService.isStudentOrAdminForCourse, CourseController.getCourseIncludingUsers);
    app.get("/course/:course_id/students",  AuthService.isStudentOrAdminForCourse, CourseController.getCourseIncludingStudents);
    app.get("/course/:course_id/admins",  AuthService.isStudentOrAdminForCourse, CourseController.getCourseIncludingAdmins)
}