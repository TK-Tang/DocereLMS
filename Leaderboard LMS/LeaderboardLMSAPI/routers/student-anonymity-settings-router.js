const Responses = require("../helpers/response");
const AuthService = require("../middleware/authentication-service");
const StudentAnonymitySettingsController = require("../controllers/student-anonymity-settings-controller");

module.exports = function(app){
    app.get("/course/:course_id/ranking/:ranking_id/studentanonymitysetting", AuthService.isStudentOrAdminForCourse, StudentAnonymitySettingsController.getStudentAnonymitySettings);

    app.post("/course/:course_id/ranking/:ranking_id/studentanonymitysetting", AuthService.isStudentOrAdminForCourse, StudentAnonymitySettingsController.updateStudentAnonymitySettings);
}