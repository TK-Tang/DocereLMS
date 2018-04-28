const Responses = require("../helpers/response");
const AuthService = require("../middleware/authentication-service");
const StudentAnonymitySettingsController = require("../controllers/student-anonymity-settings-controller");

module.exports = function(app){
    app.get("/course/:course_id/ranking/:ranking_id/studentanonymitysettings/:student_anonymity_settings_id", AuthService.isStudentOrAdminForCourse, StudentAnonymitySettingsController.getStudentAnonymitySettinngs);

    app.post("/course/:course_id/ranking/:ranking_id/studentanonymitysettings/:student_anonymity_settings_id", AuthService.isStudentOrAdminForCourse, StudentAnonymitySettingsController.updateStudentAnonymitySettings);
}