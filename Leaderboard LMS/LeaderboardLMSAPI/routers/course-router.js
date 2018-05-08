const Responses = require("../helpers/response");
const AuthService = require("../middleware/authentication-service");
const CourseController = require("../controllers/course-controller");

module.exports = function(app){
    app.get("/course/:course_id", AuthService.isLoggedIn, CourseController.getCourse);
    app.get("/course/:course_id/user/:term", AuthService.isStudentOrAdminForCourse, CourseController.getCourseIncludingUser);
    app.get("/course/:course_id/users", AuthService.isStudentOrAdminForCourse, CourseController.getCourseIncludingUsers);
    app.get("/course/:course_id/students",  AuthService.isStudentOrAdminForCourse, CourseController.getCourseIncludingStudents);
    app.get("/course/:course_id/admins",  AuthService.isStudentOrAdminForCourse, CourseController.getCourseIncludingAdmins);
    
    app.get("/course/:course_id/channels", AuthService.isStudentOrAdminForCourse, CourseController.getCourseChannels);
    app.get("/course/:course_id/forums", AuthService.isStudentOrAdminForCourse, CourseController.getCourseForums);
    app.get("/course/:course_id/categories", AuthService.isStudentOrAdminForCourse, CourseController.getCourseCategories);
    app.get("/course/:course_id/leaderboards", AuthService.isStudentOrAdminForCourse, CourseController.getCourseLeaderboards)

    app.put("/course", AuthService.isLoggedIn, CourseController.insertCourse);

    app.post("/course/:course_id", AuthService.isAdminForCourse, CourseController.updateCourse);
    app.post("/course/:course_id/archive", AuthService.isAdminForCourse, CourseController.toggleActivation);
    app.post("/course/:course_id/admin/:user_id", AuthService.isAdminForCourse, CourseController.setUserAsAdmin);

    app.delete("/course/:course_id/student/:user_id", AuthService.isAdminForCourse, CourseController.kickUser);
}